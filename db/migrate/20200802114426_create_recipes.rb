class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.json :ingredients
      t.text :instructions
      t.integer :total_time
      t.string :yields
      t.string :host
      t.string :external_url
      t.string :host_image_url
      t.string :host_author
      t.float :host_ratings
      t.string :language

      t.timestamps
    end

    add_index :recipes, :external_url, unique: true
  end
end
