class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
        jwt_revocation_strategy: JWTBlacklist

  validates_uniqueness_of :email
  # validates_presence_of :first_name, :last_name, :phone_number, :email
  has_many :jobs
  has_many :characters, through: :jobs
  has_many :on_stages, through: :characters
  has_many :french_scenes, through: :on_stages
  has_many :productions, through: :jobs
  has_many :theaters, through: :jobs
  has_many :specializations, through: :jobs
  has_many :entrance_exits

  default_scope {order(:last_name, :first_name, :email)}
end
