class Api::PaymentsController < ApplicationController

  before_action :require_login

  def index
    payments = current_user.payer_payments + current_user.payee_payments
    @return_payments = payments.map do |payment|
      friendship = Friendship.find(payment.friendship_id)
      temp = payment
      temp[:payer_id] = friendship.user1_id
      temp
    end
    render :payments
  end

  def create
    friendship = Friendship.find_by(
      user1_id: payment_params[:payer_id],
      user2_id: payment_params[:payee_id]
    )
    payment = Payment.new(
      amount: payment_params[:amount],
      friendship_id: friendship.id
    )
    if payment.save
      render json: {
        id: payment.id, amount: payment.amount
        payer_id: friendship.user1_id
      }, status: 200
    else
      render json: { errors: "Payment failed" }, status: 422
    end
  end

  private

  def payment_params
    params.require(:payment).permit(:amount, :payer_id, :payee_id)
  end

end
