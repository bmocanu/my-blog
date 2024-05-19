# Based on this blog post: https://sketchingdev.co.uk/blog/continuous-deployment-of-jekyll-website-with-jenkins.html
require 'html-proofer'

$sourceDir = "./source"
$outputDir = "./output"
$testOpts = {
  # Ignore errors "linking to internal hash # that does not exist"
  # :url_ignore => ["#"],
  # Allow empty alt tags (e.g. alt="") as these represent presentational images
  # :empty_alt_ignore => true
}

task :default => ["serve:development"]

desc "cleans the output directory"
task :clean do
  sh "jekyll clean"
end

namespace :build do

  desc "build development site"
  task :development => [:clean] do
    sh "jekyll build --drafts"
  end

  desc "build production site"
  task :production => [:clean] do
    sh "JEKYLL_ENV=production jekyll build --config=_config.yml"
  end
end

namespace :test do

  desc "test production build"
  task :production => ["build:production"] do
    HTMLProofer.check_directory($outputDir, $testOpts).run
  end
end
