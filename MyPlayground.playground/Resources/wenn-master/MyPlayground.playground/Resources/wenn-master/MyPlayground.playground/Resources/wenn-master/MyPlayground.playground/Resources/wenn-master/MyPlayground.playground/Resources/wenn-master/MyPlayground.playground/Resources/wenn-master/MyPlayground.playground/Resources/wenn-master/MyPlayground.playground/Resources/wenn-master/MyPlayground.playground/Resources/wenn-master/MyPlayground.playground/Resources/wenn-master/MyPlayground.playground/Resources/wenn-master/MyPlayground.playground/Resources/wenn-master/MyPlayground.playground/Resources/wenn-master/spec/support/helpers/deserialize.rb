module Helpers
  module Deserialize
    def json_response
      @json_response ||= jsonify(response)
    end

    def jsonify(response)
      HashWithIndifferentAccess.new(JSON.load(response.body))
    end
  end
end
