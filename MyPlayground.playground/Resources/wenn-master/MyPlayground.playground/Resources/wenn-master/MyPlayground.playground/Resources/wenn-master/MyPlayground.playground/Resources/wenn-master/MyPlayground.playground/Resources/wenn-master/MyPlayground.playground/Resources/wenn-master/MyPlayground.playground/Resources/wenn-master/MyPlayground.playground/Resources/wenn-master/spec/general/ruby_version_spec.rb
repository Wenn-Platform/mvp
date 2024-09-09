require 'rails_helper'

#treats .ruby-version as source of truth
describe "Ruby version" do
  let(:version_regex) { /\d+\.\d+\.\d+/ }
  let(:ruby_version) { version_regex.match(File.read('.ruby-version'))[0] }

  context "Gemfile" do
    it "specifies the same version as the .ruby-version file" do
      lockfile_spec = Bundler::LockfileParser.new(File.read('Gemfile.lock'))
      lockfile_ruby_version = version_regex.match(lockfile_spec.ruby_version)[0]
      expect(lockfile_ruby_version).to eq(ruby_version)
    end
  end

  context "Dockerfile" do
    it 'specifies the same base image as the .ruby-version file' do
      dockerfile = File.read('Dockerfile')
      dockerfile_ruby_version = version_regex.match(dockerfile.split("\n")[0])[0]
      expect(dockerfile_ruby_version).to eq(ruby_version)
    end
  end

  context "runtime" do
    it 'is running the same version as the .ruby-version file' do
      expect(RUBY_VERSION).to eq(ruby_version)
    end
  end
end
