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

Friendship.destroy_all
