# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_02_114426) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "links_backlogs", force: :cascade do |t|
    t.string "domain"
    t.string "url"
    t.boolean "scraped", default: false
    t.text "error"
    t.datetime "last_scraped_on"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["domain"], name: "index_links_backlogs_on_domain"
    t.index ["scraped"], name: "index_links_backlogs_on_scraped"
    t.index ["url"], name: "index_links_backlogs_on_url", unique: true
  end

  create_table "recipes", force: :cascade do |t|
    t.string "title"
    t.json "ingredients"
    t.text "instructions"
    t.integer "total_time"
    t.string "yields"
    t.string "host"
    t.string "external_url"
    t.string "host_image_url"
    t.string "host_author"
    t.float "host_ratings"
    t.string "language"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["external_url"], name: "index_recipes_on_external_url", unique: true
  end

end
