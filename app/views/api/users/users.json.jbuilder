json.friends do
  json.array! @friends, :id, :email, :name
end
