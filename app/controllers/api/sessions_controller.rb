class Api::SessionsController < ApplicationController

  def create
    if logged_in?
      render json: { errors: ["Someone is Already Logged In"] }, status: 422
    else
      @user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
      )
      if @user
        login(@user)
        render json: { id: @user.id, name: @user.name, email: @user.email }, status: 200
      else
        render json: { errors: ["Invalid Credentials"] }, status: 422
      end
    end
  end

  def destroy
    if current_user
      logout
      render json: {}, status: 200
    else
      render json: { errors: ["No One Logged In"] }, status: 422
    end
  end

end
