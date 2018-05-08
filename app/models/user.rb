class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  before_initialize :ensure_session_token!

  def User.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user if user && is_password?(password)
  end

  def User.generate_session_token!
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token!
    self.save
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token!
    self.session_token ||= User.generate_session_token!
  end
end
