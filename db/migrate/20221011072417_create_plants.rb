class CreatePlants < ActiveRecord::Migration[6.1]
  def change
    create_table :plants do |t|
      t.string :name
      t.integer :user_id
      t.integer :type_id
      t.string :image_url
      t.string :description

      t.timestamps
    end
  end
end
