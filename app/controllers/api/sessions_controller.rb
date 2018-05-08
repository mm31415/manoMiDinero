class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      login(@user)
      render json: { name: @user.name }, status: 200
    else
      render json: { errors: ["Invalid Credentials"] }, status: 422
    end
  end

  def destroy
    if current_user
      logout
      render json: {}, status: 200
    else
      render json: { session: ["No One Logged In"] }, status: 422
    end
  end

end
