json.bills do
  json.array! @return_bills, :id, :amount, :description,
    :date, :creatorId, :payerId, :note, :splits
end
