module Fleetio::Api
  class BaseService
    GET = "GET"
    POST = "POST"
    PUT = "PUT"
    DELETE = "DELETE"
    API_VERSION = 'v1'
    BASE_URL = 'https://secure.fleetio.com/api'
    
    # While the assignment only uses a get request for the fuel entries
    # Having a base class that handles all requests is something that would
    # be built in a larger app.
    class << self
      def post(data:)
        make_request(method: POST, data:)
      end

      def get(data:)
        make_request(method: GET, data:)
      end

      def put(data:)
        make_request(method: PUT, data:)
      end

      def delete(data:)
        make_request(method: DELETE, data:)
      end

      def make_request(method:, data: {})
        request = HTTP.headers({
          authorization: "Token #{Rails.application.credentials.dig(:fleetio, :api_token)}",
          "account-token": Rails.application.credentials.dig(:fleetio, :account_token)
        })
        resp = nil
        case method
        when POST
          resp = request.post(url, json: data)
        when PUT
          resp = request.put(url, json: data)
        when DELETE
          resp = request.delete(url, json: data)
        else
          resp = request.get(url, params: data)
        end
        if resp.status.success?
          return resp.to_s
        else
          raise StandardError.new("Unexpected status code #{resp.code}")
        end
      end

      def url
        "#{BASE_URL}/#{API_VERSION}/#{path}"
      end

      def path
        raise NoMethodError.new("path method must be defined by extending class")
      end
    end
  end
end