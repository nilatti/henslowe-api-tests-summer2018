class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
        jwt_revocation_strategy: JWTBlacklist

  validates_uniqueness_of :email
  # validates_presence_of :first_name, :last_name, :phone_number, :email
end
