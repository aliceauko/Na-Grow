class Plant < ApplicationRecord
    validates :name, presence: true
    belongs_to :user
    belongs_to :type
end
