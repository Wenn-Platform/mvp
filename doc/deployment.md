# About

This project is set up for Elastic Beanstalk deployment

# Setup

1. Get the AWS and Elastic Beanstalk CLIs
1. Ask Josh for access to AWS via an IAM account
1. Setup an AWS profile for wenn using `aws configure --profile wenn`. Note that we default to the `us-west-2` region

# Multiple Environments

Elastic Beanstalk provides us with multiple environments, staging and production, within the Wenn EB app. These environments should be kept as similar to one another as possible, but it is expected that production will have more robust scaling parameters.

## Environment creation

To create a new environment:

1. Navigate to existing environment e.g. https://us-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=us-west-2#/environment/dashboard?applicationName=Wenn&environmentId=e-3ikcnnpwhp
1. Actions -> Clone environment
1. Customize the environment configuration (e.g. through environment variables). See below.

## Environment variables

In addition to the EB defaults, the following should be set:

`RAILS_MASTER_KEY`: should be set to the same value as `config/master.key`
`CXXFLAGS`: should be set to `--std=c++14` to avoid a Node v16 bug with `sassc` compilation
`RACK_ENV` and `RAILS_ENV`: should both match the name of the environment from `config/{environment}.rb` (e.g. `production`)
`RAILS_LOG_TO_STDOUT`: should be set to `true` in order to keep application logs flowing into the `/var/log/web.stdout.log` Cloudwatch stream automatically
`RAILS_SKIP_ASSET_COMPILATION`: TBD. `false` by default
`RAILS_SKIP_MIGRATIONS`: TBD. `false` by default. TODO: Are migrations being run on every deployment?
`RAILS_SERVE_STATIC_FILES`: Related to `RAILS_SKIP_ASSET_COMPILATION`. Serves static files (e.g. webpacked assets) from disk
`PORT`: should be set to the same port as the EB environment's load balancer default process. See Configuration -> Load Balancer -> Processes. We have chosen `5000` for now.

## Database initialization

After making your first deployment, SSH into a machine and run `cd /var/app/current; rake db:schema:load`. Note that if you run this in an existing environment **it will wipe out the entire database**.

# Deployment

Simply:

```
deploy.sh
```

and follow the prompts from the EB deploy script. Note that we have custom wrapper for the EB CLI, so do not use `eb deploy` directly. This will result in an incomplete deployment that will fail. See `deploy.sh` for more details.

# Elastic Beanstalk Customization

## Configuration

Some areas of configuration that we've changed from EB defaults:

1. Added a load balancer to all environments. In production, this allows us to autoscale. In other environments, this allows us to to be more production-like.
1. Within the load balancer, point at our webserver process port (5000) instead of 80.
1. Add a built-in RDS database. Note that for production, we must enable termination protection!
1. Enabled Cloudwatch log streaming. Pay careful attention to the retention policy, depending on environment.
1. Added capacity by choosing larger EC2 instances (tN.small at a minimum to handle asset compilation)
1. Enabled rolling updates
1. Add a keypair for SSH (ask Josh for access)
1. Setup notifiactions (TODO: use an engineering-wide email)

## ebextensions
Note that we have customized our EB usage via the `.ebextensions` directory. While this is necessary in some cases (see current `.config` files in that directory), these customizations are brittle and difficult to test. Prefer other methods of customization where possible.

# TODO

* Document each ebextension
* Document keypairs (SSH/debugging)
* Upgrade ruby version
* Redis
* Cloudfront/S3 for static side