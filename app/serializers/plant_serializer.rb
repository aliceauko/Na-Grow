class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :type_id, :image_url ,:description
  belongs_to :user
  belongs_to :type
  

end
