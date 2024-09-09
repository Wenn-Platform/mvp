module Helpers
  module ReplayRequest
    def replay_request(name)
      filename = File.exist?(name) ? name : "spec/support/requests/#{name}.json"
      request = JSON.parse(File.read(filename))

      path = request['path']
      path +=  "?" + request['query_string'] if request['query_string'].present?
      method = request['method'].downcase.to_sym
      # currently only supports JSON request body, but will attempt to pass string
      # if not JSON parseable, which *probably* results in supporting other content types
      params = JSON.parse(request['body']) rescue request['body']
      as = (:json if params.is_a?(Hash))

      process(method, path, params: params, headers: request['headers'], as: as)
    end
  end
end
