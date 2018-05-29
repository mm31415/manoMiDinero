# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

User.destroy_all
User.create(name: "guest", email: "guestemail@guest.com", password: "guestlogin")
User.create(name: "Abby", email: "abbyemail@abby.com", password: "abbylogin")
User.create(name: "Paul", email: "paulemail@paul.com", password: "paullogin")
User.create(name: "Jahan", email: "jahanemail@jahan.com", password: "jahanlogin")
User.create(name: "Alicia", email: "aliciaemail@alicia.com", password: "alicialogin")
User.create(name: "Brian", email: "brianemail@brian.com", password: "brianlogin")
User.create(name: "David", email: "davidemail@david.com", password: "davidlogin")

Friendship.destroy_all
guest_user = User.first
User.all[1..-1].each do |user|
  Friendship.create(user1_id: guest_user.id, user2_id: user.id)
  Friendship.create(user1_id: user.id, user2_id: guest_user.id)
end

Bill.destroy_all
BillSplit.destroy_all
SharedBill.destroy_all
5.times do
  amount = Faker::Commerce.price
  split1 = amount / 2.0
  split2 = amount - split1
  d = Faker::Date.between('2017-01-01', '2019-12-31');
  creator_id = guest_user.id
  payer_id = User.all.shuffle.first.id
  friend_id = (payer_id == creator_id ? User.all.shuffle.first.id : payer_id)
  while (friend_id == guest_user.id) do
    friend_id = User.all.shuffle.first.id
  end
  friendship_id = Friendship.find_by(user1_id: guest_user.id, user2_id: friend_id)

  bill = Bill.create(
    amount: amount,
    description: Faker::Food.dish,
    date: "#{d.to_s}",
    creator_id: creator_id,
    payer_id: payer_id,
  )

  BillSplit.create(
    amount: split1,
    bill_id: bill.id,
    user_id: payer_id,
  )
  BillSplit.create(
    amount: split2,
    bill_id: bill.id,
    user_id: (payer_id == guest_user.id ? friend_id : guest_user.id)
  )

  SharedBill.create(
    bill_id: bill.id,
    friendship_id: friendship_id
  )
end
