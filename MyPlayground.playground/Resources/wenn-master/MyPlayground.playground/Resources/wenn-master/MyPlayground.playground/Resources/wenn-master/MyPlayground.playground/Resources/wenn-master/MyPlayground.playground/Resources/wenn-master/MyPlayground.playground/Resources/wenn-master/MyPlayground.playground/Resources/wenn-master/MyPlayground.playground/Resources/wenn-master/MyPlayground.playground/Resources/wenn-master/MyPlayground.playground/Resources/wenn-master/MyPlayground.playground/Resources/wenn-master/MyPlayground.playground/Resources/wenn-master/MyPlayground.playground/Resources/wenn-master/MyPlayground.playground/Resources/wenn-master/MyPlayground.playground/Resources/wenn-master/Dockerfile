FROM ruby:2.7.7

ENV RAILS_ROOT /app
ENV RAILS_LOG_TO_STDOUT true
ENV RAILS_SERVE_STATIC_FILES true

RUN mkdir $RAILS_ROOT
WORKDIR $RAILS_ROOT

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y libpq-dev curl nodejs yarn
RUN gem install bundler # Upgrade to Bundler 2.

COPY Gemfile* $RAILS_ROOT/
RUN bundle install --jobs 20 --retry 5 --without development test

ARG RAILS_ENV
ENV RAILS_ENV ${RAILS_ENV:-production}
ENV RACK_ENV $RAILS_ENV

COPY package.json yarn.lock $RAILS_ROOT/
RUN yarn

COPY . .

RUN SKIP_DB_CONNECT=true bundle exec rake webpacker:compile

RUN git rev-parse HEAD | tee public/.rev

EXPOSE 3000
#todo: replace with command for application server such as puma
CMD ["bundle", "exec", "rails", "s"]
