source "https://rubygems.org"

gem "jekyll", "~> 4.4"
gem "webrick" # required for Ruby >= 3.0

# Jekyll plugins (also whitelisted by GitHub Pages classic build)
group :jekyll_plugins do
  gem "jekyll-seo-tag", "~> 2.0" # <title>, meta description, OpenGraph/Twitter cards
end

# Linters used by CI only — not loaded during `jekyll serve`
group :test do
  gem "html-proofer", "~> 5.0"   # checks built HTML: broken links, missing images, bad refs
  gem "w3c_validators", "~> 1.3" # W3C HTML validation (used by tools/w3c_validate.rb)
end
