#!/usr/bin/env ruby
# frozen_string_literal: true

# Validate built HTML files against the W3C Nu validator.
# Usage: ruby tools/w3c_validate.rb _site/index.html _site/404.html
# Exits non-zero if any file has validation errors.

require "w3c_validators"
include W3CValidators

files = ARGV.empty? ? ["_site/index.html"] : ARGV
validator = NuValidator.new
total_errors = 0

files.each do |path|
  unless File.exist?(path)
    warn "skip (not found): #{path}"
    next
  end

  results = validator.validate_file(path)
  if results.errors.empty?
    puts "OK   #{path}"
  else
    total_errors += results.errors.length
    puts "FAIL #{path} (#{results.errors.length} errors)"
    results.errors.each { |err| puts "  - #{err}" }
  end
end

exit(total_errors.zero? ? 0 : 1)
