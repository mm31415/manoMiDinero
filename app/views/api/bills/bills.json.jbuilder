json.bills do
  json.array! @return_bills, :id, :amount, :description,
    :date, :creatorId, :payer_id, :note, :splits
end
