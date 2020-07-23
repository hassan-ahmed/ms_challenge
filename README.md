# README

Steps to run the application
#### Prerequisites
* ruby 2.7.1
* node v8.17
* python 3.x
* postgresql 10+
* elasticsearch 7.x
* docker 18+
* docker-compose 1.26

#### Rails app dev setup
* `bundle install`
* `yarn install`
* `rails db:create` & `rails db:migrate`
* `cp .env-sample .env` & update ENV vars accordingly
* run `rails s` to start the app
* run `rails searchkick:reindex CLASS=Recipe` to index recipes in elasticsearch

#### Recipe scraper
* run `docker-compose up --build` & it should start scraping recipes
* logs are placed in scraper-data/scraper.log
* `docker ps` to list containers
* `docker logs -f recipe-scraper` to check logs from the container
* `docker exec -it recipe-scraper bin/bash` to log in to the container

#### Rails app prod env
* make sure to set required ENV vars
* `bundle install`
* `yarn install`
* `rails assets:precompile`
* `rails db:create` & `rails db:migrate`
* 