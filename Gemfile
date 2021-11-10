source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.2"

gem "bootsnap", ">= 1.4.4", require: false
gem "http", "~> 5.0"
gem "jbuilder", "~> 2.7"
gem "pg", "~> 1.1"
gem "puma", "~> 5.3"
gem "rails", "~> 6.1.3"
gem "redis", "~> 4.0"
gem "sidekiq", "~> 6.2", ">= 6.2.1"
gem "webpacker", "~> 5.0"

group :development, :test do
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "rspec-rails", "~> 5.0.0"
end

group :development do
  gem "listen", "~> 3.3"
  gem "rack-mini-profiler", "~> 2.3"
  gem "spring"
  gem "web-console", ">= 4.1.0"
end
