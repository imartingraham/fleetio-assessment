require "rails_helper"

RSpec.describe Fleetio::Api::FuelEntriesService do
  describe "#path" do
    context "When calling #path on fuel entries service" do
      it "should return fuel_entries" do
        expect(Fleetio::Api::FuelEntriesService.path).to eq("fuel_entries")
      end
      
    end
  end

  describe "#call" do
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

    context "when making request to fuel_entries api" do
      let(:expected_response) {
        [{
          "usage_in_mi": 10,
          "us_gallons": 1
        }].to_json
      }
      it "should make a get request with appropriate headers" do
        vehicle = Vehicle.new({external_id: 123})
        # Stub responses to creds and test path
        allow(Rails.application).to receive(:credentials).and_return(expected_creds)
        stub_request(:get, Fleetio::Api::FuelEntriesService.url).with(headers: expected_headers, query: {"q[vehicle_id_eq]" => "123", "q[s]" => "created_at+desc"}.to_query).to_return(status: 200, body: expected_response)
        entries = Fleetio::Api::FuelEntriesService.call(vehicle)
        expect(entries).to include({"usage_in_mi" => 10, "us_gallons" => 1})
      end
    end
  end
end