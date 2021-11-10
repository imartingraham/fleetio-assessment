class CreateVehicles < ActiveRecord::Migration[6.1]
  def change
    create_table :vehicles do |t|
      t.string :name, null: false, default: ""
      t.string :image_url
      t.string :category
      t.integer :external_id, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
