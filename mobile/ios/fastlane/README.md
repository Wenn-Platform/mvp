fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios set_env

```sh
[bundle exec] fastlane ios set_env
```

Writes a `.env` file with App-Specific Password for Wenn

A `.env` file will be created to store your App-Specific Password

This is required in order to upload your builds to TestFlight

`.env` is gitignored so do not commit it to version control

1. Go to https://appleid.apple.com/account/manage and create an App-Specific Password for Wenn

2. Set the FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD env var

3. Run `fastlane set_env`

Future `fastlane beta` runs will use the App-Specific Password from the env file

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Build and push a new beta build to TestFlight

### ios beta_upload

```sh
[bundle exec] fastlane ios beta_upload
```

Push an IPA to TestFlight that's already been built using fastlane beta

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
