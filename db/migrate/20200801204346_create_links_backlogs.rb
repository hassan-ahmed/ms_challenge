class CreateLinksBacklogs < ActiveRecord::Migration[6.0]
  def change
    create_table :links_backlogs do |t|
      t.string :domain
      t.string :url
      t.boolean :scraped, default: false
      t.text :error
      t.datetime :last_scraped_on
      t.timestamps
    end

    add_index :links_backlogs, :domain
    add_index :links_backlogs, :url, unique: true
    add_index :links_backlogs, :scraped
  end
end
