class Api::PaymentsController < ApplicationController

  before_action :require_login

  def index
    @bill = bill.find(split_params[:bill_id])
    @payments = bill.payments
    render json: { message: "ok" }, status: 200
  end

  def create
    @payments = payment_params.map do |payment|
      BillSplit.create(payment, bill_id: payment_params[:bill_id])
    end
    render json: { message: "ok" }, status: 200
  end

  def update
    #
    # I need to fix this here, right now I am querying the database
    # way too many times
    #
    payment_params.each do |paymnet_update|
      payment = Payment.find(payment_update.id)
      payment.update(payment_update)
    end
    render :index
  end

  private

  def payment_params
    params.require(:payments).permit(:payments, :bill_id)
  end

end
