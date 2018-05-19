class Api::BillsController < ApplicationController

  before_action :require_login

  def index
    bills = current_user.bills
    @return_bills = bills.map { |bill| bill.to_h.merge({ splits: bill.splits }) }
    render :bills
  end

  def create
    @bill = Bill.new(bill_params)
    @bill.creator_id = current_user.id
    if @bill.save
      @splits = [];
      split_params[:splits].each do |key, split|
        split[:bill_id] = @bill.id
        @splits.push(BillSplit.create(split))
      end
      friendship = Friendship.find_by(user1_id: current_user.id, user2_id: friend_params[:id])
      SharedBill.create(bill_id: @bill.id, friendship_id: friendship.id)
      render json: {
        id: @bill.id, amount: @bill.amount,
        description: @bill.description, date: @bill.date,
        note: @bill.note, payerId: @bill.payer_id,
        splits: @splits
        }, status: 200
    else
      render json: { errors: @bill.errors.full_messages }, status: 422
    end
  end

  def update
    @bill = Bill.find(params[:id])

    if @bill.nil?
      render json: { errors: "Bill does not exist" }, status: 422
    elsif @bill.update(bill_params)
      split_params.each do |split_update|
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
      render json: { id: bill.id }, status: 200
    end
  end

  private

  def bill_params
    params.require(:bill).
      permit(:amount, :description, :date, :note, :payer_id)
  end

  def split_params
    params.require(:bill).
      permit(:splits => [:user_id, :amount])
  end

  def friend_params
    params.require(:friend).permit(:id);
  end

end
