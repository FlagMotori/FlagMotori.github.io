#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Compile the site's SCSS with LibSass (sassc) -- the SAME engine the LIVE
# classic GitHub Pages build uses (jekyll-sass-converter 1.5.2). The repo's own
# jekyll 4.x build uses Dart sass, which silently accepts Dart-only features
# (e.g. @use / @forward) that LibSass DROPS, shipping an unstyled site. This
# check fails CI when that happens, instead of letting it reach production.

require "sassc"

ENTRY = "assets/css/style.scss"
# Markers that prove the theme partials were actually inlined into the output.
REQUIRED = ["--accent", ".theme-toggle"].freeze

scss = File.read(ENTRY).sub(/\A---.*?---\s*/m, "") # strip Jekyll front matter
css = SassC::Engine.new(scss, style: :compressed, load_paths: ["_sass"]).render

missing = REQUIRED.reject { |marker| css.include?(marker) }
if missing.empty?
  puts "LibSass OK: #{ENTRY} -> #{css.bytesize} bytes, theme styles present."
else
  warn "LibSass FAIL: compiled CSS is missing #{missing.join(', ')}."
  warn "A Dart-only Sass feature (e.g. @use/@forward) was silently dropped by LibSass --"
  warn "the live classic GitHub Pages build would ship an unstyled site. Use @import instead."
  exit 1
end
