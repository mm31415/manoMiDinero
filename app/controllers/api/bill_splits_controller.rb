class BillSplitsController < ApplicationController

  before_action :require_login

  def index
    @bill = bill.find(split_params[:bill_id])
    @bill_splits = bill.splits
    render json: { message: "ok" }, status: 200
  end

  def create
    @bill_splits = split_params.map do |split|
      BillSplit.create(split, bill_id: split_params[:bill_id])
    end
    render json: { message: "ok" }, status: 200
  end

  def update
    #
    # I need to fix this here, right now I am querying the database
    # way too many times
    # @bill_splits = BillSplit.where(bill_id: split_params[:bill_id])
    split_params.each do |split_update|
      split = BillSplit.find(split_update.id)
      split.update(split_update)
    end
    render :index
  end

  private

  def split_params
    params.require(:bill_splits).permit(:splits, :bill_id)
  end

end
