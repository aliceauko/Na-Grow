class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :age, numericality: {minimum: 18}
    has_many  :plants
    has_many :types, through: :plants
end
