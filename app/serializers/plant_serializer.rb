class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :type_id, :image_url
  belongs_to :user
  belongs_to :type
  

end
