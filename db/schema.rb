# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180530132905) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bill_splits", force: :cascade do |t|
    t.decimal "amount", precision: 16, scale: 2, null: false
    t.integer "bill_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bill_id", "user_id"], name: "index_bill_splits_on_bill_id_and_user_id", unique: true
  end

  create_table "bills", force: :cascade do |t|
    t.decimal "amount", precision: 16, scale: 2, null: false
    t.string "description", null: false
    t.string "date", null: false
    t.integer "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "payer_id", null: false
    t.index ["creator_id"], name: "index_bills_on_creator_id"
    t.index ["payer_id"], name: "index_bills_on_payer_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "user1_id", null: false
    t.integer "user2_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user1_id", "user2_id"], name: "index_friendships_on_user1_id_and_user2_id", unique: true
  end

  create_table "payments", force: :cascade do |t|
    t.decimal "amount", precision: 16, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "friendship_id", null: false
    t.index ["friendship_id"], name: "index_payments_on_friendship_id"
  end

  create_table "shared_bills", force: :cascade do |t|
    t.integer "bill_id", null: false
    t.integer "friendship_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bill_id", "friendship_id"], name: "index_shared_bills_on_bill_id_and_friendship_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
