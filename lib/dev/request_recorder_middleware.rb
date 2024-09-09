#heavily adapted from rack-recorder gem

# logs requests as JSON for reuse in tests. useful when building a controller action
# that acts a webhook from a third party service. check out npm localtunnel module
# to route requests to your machine
#
# to use, add the following to config/application.rb:
#    require_relative '../lib/dev/request_recorder_middleware'
#    config.middleware.unshift Dev::RequestRecorderMiddleware
#

if Rails.env.development?
  module Dev
    class RequestRecorderMiddleware
      def initialize(app, options = {})
        @app = app
        @file = options[:file] || Proc.new do |request, response|
          request.path.sub('/','').gsub('/','_') + '.json'
        end
      end

      def call(env)
        request = Rack::Request.new(env)
        request_hash = {
          body: request.body.try(:read),
          headers: Hash[
                     request.each_header.
                       select { |(header, value)| header.starts_with?('HTTP') }
                   ].
                     transform_keys { |header| header.sub(/^HTTP_/,'') },
          method: request.request_method,
          path: request.path,
          query_string: request.query_string,
          url: request.url,
        }
        request.body.rewind if request.body
        response = @app.call(env)
        begin
          filename = @file.respond_to?(:call) ? @file.call(request, response) : @file
          File.write(filename, JSON.pretty_generate(request_hash))
        rescue => ex
          Rails.logger.error(ex.message)
          Rails.logger.error(ex.backtrace)
        end
        response
      end
    end
  end
end
