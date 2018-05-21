class Api::FriendshipsController < ApplicationController

  before_action :require_login

  def index
    @friends = current_user.friends
    render("api/users/users.json.jbuilder").html_safe
  end

  def create
    friend = User.find_by(email: friendship_params[:friend_email])
    if friend.nil?
      render json: {
        errors: ["Friend email does not exist in database"] }, status: 422
    elsif (friend.id == current_user.id)
      render json: { errors: ["You can't add yourself"] }, status: 422
    else
      friendship = Friendship.new(
        user1_id: current_user.id, user2_id: friend[:id])
      friendship2 = Friendship.new(
        user1_id: friend[:id], user2_id: current_user.id)
      if friendship.save && friendship2.save
        render json: { id: friend.id,
          email: friend.email, name: friend.name }, status: 200
      else
        render json: { errors: ["Friend already exists"] }, status: 422
      end
    end
  end

  def destroy
    friendship1 = Friendship.find_by(
      user1_id: current_user.id,
      user2_id: friendship_params[:friend_id]
      )
    friendship2 = friendship1.pair_friendship
    bill_ids = friendship1.shared_bills.map { |share| share.bill_id }
    if friendship1.nil? || friendship2.nil?
      render json: { errors: ["Friendship does not exist"] }, status: 422
    else
      friendship1.destroy
      friendship2.destroy
      render json: {
        friendId: friendship_params[:friend_id],
        billIds: bill_ids }, status: 200
    end
  end

  private

  def friendship_params
    params.require(:friendship).permit(:friend_id, :friend_email);
  end

end
