class Api::BillsController < ApplicationController

  before_action :require_login

  def create
    @bill = Bill.new(bill_params)
    @bill.creator_id = current_user.id

    if @bill.save
      @splits = bill_params[:splits].map do |split|
        BillSplit.create(split, bill_id: @bill.id)
      end
      render json: { message: "Bill Created" }, status: 200
    else
      render json: { errors: @bill.errors.full_messages }, status: 422
    end
  end

  def update
    @bill = Bill.find(params[:id])

    if @bill.nil?
      render json: { errors: "Bill does not exist" }, status: 422
    elsif @bill.update(bill_params)
      bill_params[:splits].each do |split_update|
        split = BillSplit.find(split_update.id)
        split.update(split_update)
      end
      @splits = @bill.bill_splits
      render :show
    else
      render json: { errors: @bill.errors.full_messages }, status: 422
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
      permit(:amount, :description, :date, :note, :payer_id, { :splits => [] })
  end

end
