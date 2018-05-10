class Api::FriendshipsController < ApplicationController

  before_action :require_login

  def create
    friend = User.find_by(email: friendship_params[:friend_email])
    if friend.nil?
      render json: { errors: "Friend email does not exist in database" }, status: 422
    else
      friendship = Friendship.new(user_id1: friendship_params[:user_id1], user_id2: friend[:id])
      if friendship.save
        render json: { user_id1: friendship.user_id1, user_id2: friendship.user_id2 }, status: 200
      else
        render json: { errors: "Friend already exists" }, status: 422
      end
    end
  end

  def destroy
    friendship = Friendship.find_by(friendship_params)
    if friendship.destroy
      render json: { message: "Friendship Destroyed", user_id1: friendship.user_id1, user_id2: friendship.user_id2  }, status: 200
    else
      render json: { errors: "Friendship does not exist" }, status: 422
    end
  end

  private

  def friendship_params
    params.require(:friendship).permit(:user_id1, :friend_email, :user_id2);
  end

end
