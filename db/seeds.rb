# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.create(name: "guest", email: "guestemail@guest.com", password: "guestlogin");
User.create(name: "Abby", email: "abbyemail@abby.com", password: "abbylogin");
User.create(name: "Paul", email: "paulemail@paul.com", password: "paullogin");
User.create(name: "Jahan", email: "jahanemail@jahan.com", password: "jahanlogin");
User.create(name: "Alicia", email: "aliciaemail@alicia.com", password: "alicialogin");
User.create(name: "Brian", email: "brianemail@brian.com", password: "brianlogin");
User.create(name: "David", email: "davidemail@david.com", password: "davidlogin");

Friendship.destroy_all

guest_user = User.first

User.all[1..-1].each do |user|
  Friendship.create(user1_id: guest_user.id, user2_id: user.id)
  Friendship.create(user1_id: user.id, user2_id: guest_user.id)
end

Bill.destroy_all
