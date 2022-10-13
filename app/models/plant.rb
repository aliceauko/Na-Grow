class Plant < ApplicationRecord
    validates :description, presence: true
    belongs_to :user
    belongs_to :type
end
