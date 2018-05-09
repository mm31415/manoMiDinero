class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render json: { id: @user.id, name: @user.name, email: @user.email }, status: 200
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end

end
