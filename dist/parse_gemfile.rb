require 'json'
require 'bundler'

gemfile = ARGV[0]
raise 'Usage: ruby parse_gemfile.rb GEMFILE_PATH' if gemfile.nil?

deps =
  Bundler::Definition.build(gemfile, nil, nil).dependencies.map do |dep|
    {
      name: dep.name,
      groups: dep.groups,
    }
  end

puts deps.to_json
