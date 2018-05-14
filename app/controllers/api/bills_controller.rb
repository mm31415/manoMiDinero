class Api::BillsController < ApplicationController

  before_action :require_login

  def create
    @bill = Bill.new(bill_params)
    @bill.creator_id = current_user.id

    if @bill.save
      @splits = split_params.map do |split|
        BillSplit.create(split, bill_id: @bill.id)
      end
      render :show
    else
      render json: { errors: @bill.errors.full_messages }, status: 422
    end
  end

  def update
    @bill = Bill.find(params[:id])

    if @bill.nil?
      render json: { errors: "Bill does not exist" }, status: 422
    else @bill.update(bill_params)
      split_params.each do |split_update|
        split = BillSplit.find(split_update.id)
        split.update(split_update)
      end
      @splits = @bill.bill_splits
      render :show, status: 200
    end
  end

  def destroy
    bill = Bill.find(params[:id])
    if bill.nil?
      render json: { errors: "Bill does not exist" }, status: 422
    else bill.destroy
      render json: { message: "Bill Destroyed" }, status: 200
    end
  end

  private

  def bill_params
    params.require(:bill).
      permit(:amount, :description, :date, :note, :payer_id)
  end

  def split_params
    params.require(:bill_splits).permit(:splits)
  end

end
