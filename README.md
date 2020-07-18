# README

Steps to run the application
#### Prerequisites
* ruby 2.7
* node v8.17
* postgresql 

#### Development env
* `bundle install`
* `yarn install`
* `rails db:create`, although it's not using any db for now 
* edit `.env` to place to the values for `Contentful_Space` & `Contentful_Access_Token` vars
* execute `rails s` to run the app

#### Production env
* make sure to set `Contentful_Space` & `Contentful_Access_Token` vars in ENV
* `bundle install`
* `yarn install`
* `rails assets:precompile`
* `rails db:create`
* 