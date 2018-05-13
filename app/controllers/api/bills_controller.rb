class BillsController < ApplicationController

  before_action :require_login

  def create
    bill = Bill.new(bill_params)
    bill.creator_id = current_user.id 

    if bill.save
      render json: {
        id: bill.id, amount: bill.amount, date: bill.date,
        note: bill.note, creatorId: bill.creator_id
      }, status: 200
    else
      render json: { errors: @bill.errors.full_messages }, status: 422
    end
  end

  def update
    bill = Bill.find(bill_params[:id])

    if bill.nil?
      render json: { errors: "Bill does not exist" }, status: 422
    else bill.update(bill_params)
      render json: {
        id: bill.id, amount: bill.amount, date: bill.date,
        note: bill.note, creatorId: bill.creator_id
      }, status: 200
    end
  end

  def destroy
    bill = Bill.find(bill_params[:id])
    if bill.nil?
      render json: { errors: "Bill does not exist" }, status: 422
    else bill.destroy
      render json: { message: "Bill Destroyed" }, status: 200
    end
  end

  private

  def bill_params
    params.require(:bill).
      permit(:id, :amount, :description, :date, :note)
  end

end
