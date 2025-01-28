require "rails_helper"

RSpec.describe Fleetio::Api::BaseService do
  describe "#make_request" do
    before do 
      WebMock.enable!
    end

    after do
      WebMock.disable!
    end

    let(:expected_creds){
      {
        fleetio: {
          api_token: "test-token",
          account_token: "test-token"
        }
      }
    }
    let(:expected_headers){
      {
        Authorization: "Token #{expected_creds.dig(:fleetio, :api_token)}",
        "Account-Token": expected_creds.dig(:fleetio, :account_token)
      }
    }
    context "post request" do
      it "should make a post request with appropriate headers" do
        # Stub responses to creds and test path
        allow(Fleetio::Api::BaseService).to receive(:path).and_return("test")
        allow(Rails.application).to receive(:credentials).and_return(expected_creds)
        stub_request(:post, Fleetio::Api::BaseService.url).with(headers: expected_headers, body: {"hello" => "world"}).to_return(status: 200, body: {test: :test}.to_json)

        data = Fleetio::Api::BaseService.make_request(method: "POST", data: {hello: :world})
        expect(data).to eq({"test": "test"}.to_json)
      end
      it "should raise an exception when the response fails" do 
        allow(Fleetio::Api::BaseService).to receive(:path).and_return("test")
        allow(Rails.application).to receive(:credentials).and_return(expected_creds)
        stub_request(:post, Fleetio::Api::BaseService.url).with(headers: expected_headers, body: {"hello" => "world"}).to_return(status: 500, body: "Internal Server Error")

        expect {Fleetio::Api::BaseService.make_request(method: "POST", data: {hello: :world}) }.to raise_error(StandardError, "Unexpected status code 500")
      end
    end

    context "get request" do
      it "should make a get request with appropriate headers" do
        # Stub responses to creds and test path
        allow(Fleetio::Api::BaseService).to receive(:path).and_return("test")
        allow(Rails.application).to receive(:credentials).and_return(expected_creds)
        stub_request(:get, Fleetio::Api::BaseService.url).with(headers: expected_headers, query: {"hello" => "world"}.to_query).to_return(status: 200, body: {test: :test}.to_json)

        data = Fleetio::Api::BaseService.make_request(method: "GET", data: {hello: :world})
        expect(data).to eq({"test": "test"}.to_json)
      end
    end

    context "put request" do
      it "should make a put request with appropriate headers" do
        # Stub responses to creds and test path
        allow(Fleetio::Api::BaseService).to receive(:path).and_return("test")
        allow(Rails.application).to receive(:credentials).and_return(expected_creds)
        stub_request(:put, Fleetio::Api::BaseService.url).with(headers: expected_headers, body: {"hello" => "world"}).to_return(status: 200, body: {test: :test}.to_json)

        data = Fleetio::Api::BaseService.make_request(method: "PUT", data: {hello: :world})
        expect(data).to eq({"test": "test"}.to_json)
      end
    end

    context "delete request" do
      it "should make a delete request with appropriate headers" do
        # Stub responses to creds and test path
        allow(Fleetio::Api::BaseService).to receive(:path).and_return("test")
        allow(Rails.application).to receive(:credentials).and_return(expected_creds)
        stub_request(:delete, Fleetio::Api::BaseService.url).with(headers: expected_headers, body: {"hello" => "world"}).to_return(status: 200, body: {test: :test}.to_json)

        data = Fleetio::Api::BaseService.make_request(method: "DELETE", data: {hello: :world})
        expect(data).to eq({"test": "test"}.to_json)
      end
    end
  end

  describe "#path" do
    context "When the base class path is called" do
      it "should raise a NoMethodError" do
        expect{ Fleetio::Api::BaseService.path}.to raise_error(NoMethodError)
      end
    end
  end
end