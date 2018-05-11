class Api::FriendshipsController < ApplicationController

  before_action :require_login

  def index
    render json: {
      friends: [
        { id: 400, name: "fakename", email: "fakeemail@fake.com"},
        { id: 537, name: "fakename2", email: "fakeemail2@fake.com"}] }, status: 200
  end

  def create
    friend = User.find_by(email: friendship_params[:friend_email])
    if friend.nil?
      render json: { errors: "Friend email does not exist in database" }, status: 422
    elsif (friend.id == current_user.id)
      render json: { errors: "You can't add yourself" }, status: 422
    else
      friendship = Friendship.new(user1_id: friendship_params[:user1_id], user2_id: friend[:id])
      friendship2 = Friendship.new(user1_id: friend[:id], user2_id: friendship_params[:user1_id])
      if friendship.save && friendship2.save
        render json: { id: friend.id, name: friend.name, email: friend.email }, status: 200
      else
        render json: { errors: "Friend already exists" }, status: 422
      end
    end
  end

  def destroy
    friendship1 = Friendship.find_by(friendship_params)
    friendship2 = Friendship.find_by(
        user1_id: friendship_params[:user2_id],
        user2_id: friendship_params[:user1_id]
        )
    if friendship1.nil? || friendship2.nil?
      render json: { errors: "Friendship does not exist" }, status: 422
    else
      friendship1.destroy
      friendship2.destroy
      friend_id = (current_user.id == friendship1.user1_id) ? friendship1.user2_id : friendship1.user1_id
      render json: { message: "Friendship Destroyed", friendId: friend_id }, status: 200
    end
  end

  private

  def friendship_params
    params.require(:friendship).permit(:user1_id, :friend_email, :user2_id);
  end

end
