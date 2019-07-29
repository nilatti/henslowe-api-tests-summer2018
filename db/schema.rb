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

ActiveRecord::Schema.define(version: 2019_07_23_210224) do

  create_table "active_admin_comments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "acts", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "number"
    t.bigint "play_id"
    t.text "summary"
    t.integer "start_page"
    t.integer "end_page"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["play_id"], name: "index_acts_on_play_id"
  end

  create_table "admin_users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "authors", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.date "birthdate"
    t.date "deathdate"
    t.string "nationality"
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.string "gender"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "characters", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "age"
    t.string "gender"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "play_id"
    t.string "xml_id"
    t.index ["play_id"], name: "index_characters_on_play_id"
  end

  create_table "entrance_exits", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "french_scene_id"
    t.integer "page"
    t.integer "line"
    t.integer "order"
    t.bigint "stage_exit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category"
    t.text "notes"
    t.bigint "character_id"
    t.index ["character_id"], name: "index_entrance_exits_on_character_id"
    t.index ["french_scene_id"], name: "index_entrance_exits_on_french_scene_id"
    t.index ["stage_exit_id"], name: "index_entrance_exits_on_stage_exit_id"
  end

  create_table "french_scenes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "scene_id"
    t.string "number"
    t.text "summary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "end_page"
    t.integer "start_page"
    t.index ["scene_id"], name: "index_french_scenes_on_scene_id"
  end

  create_table "jobs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "production_id"
    t.bigint "specialization_id"
    t.bigint "user_id"
    t.date "start_date"
    t.date "end_date"
    t.bigint "theater_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "character_id"
    t.index ["character_id"], name: "index_jobs_on_character_id"
    t.index ["production_id"], name: "index_jobs_on_production_id"
    t.index ["specialization_id"], name: "index_jobs_on_specialization_id"
    t.index ["theater_id"], name: "index_jobs_on_theater_id"
    t.index ["user_id"], name: "index_jobs_on_user_id"
  end

  create_table "jwt_blacklist", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "jti", null: false
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "on_stages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "character_id"
    t.bigint "user_id"
    t.bigint "french_scene_id"
    t.text "description"
    t.text "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "nonspeaking", default: false
  end

  create_table "plays", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title"
    t.bigint "author_id"
    t.date "date"
    t.string "genre"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "canonical", default: false
    t.text "text_notes"
    t.bigint "production_id"
    t.integer "original_play_id"
    t.index ["author_id"], name: "index_plays_on_author_id"
    t.index ["production_id"], name: "index_plays_on_production_id"
  end

  create_table "productions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.bigint "theater_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["theater_id"], name: "index_productions_on_theater_id"
  end

  create_table "scenes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "number"
    t.text "summary"
    t.bigint "act_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "end_page"
    t.integer "start_page"
    t.index ["act_id"], name: "index_scenes_on_act_id"
  end

  create_table "space_agreements", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "theater_id"
    t.bigint "space_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["space_id"], name: "index_space_agreements_on_space_id"
    t.index ["theater_id"], name: "index_space_agreements_on_theater_id"
  end

  create_table "spaces", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "phone_number"
    t.string "website"
    t.integer "seating_capacity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "mission_statement"
  end

  create_table "specializations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stage_exits", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "production_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["production_id"], name: "index_stage_exits_on_production_id"
  end

  create_table "theaters", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "phone_number"
    t.text "mission_statement"
    t.string "website"
    t.string "calendar_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.string "phone_number"
    t.date "birthdate"
    t.string "timezone"
    t.string "gender"
    t.text "bio"
    t.text "description"
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "website"
    t.string "emergency_contact_name"
    t.string "emergency_contact_number"
    t.string "preferred_name"
    t.string "program_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "acts", "plays"
  add_foreign_key "entrance_exits", "french_scenes"
  add_foreign_key "entrance_exits", "stage_exits"
  add_foreign_key "french_scenes", "scenes"
  add_foreign_key "jobs", "characters"
  add_foreign_key "jobs", "productions"
  add_foreign_key "jobs", "specializations"
  add_foreign_key "jobs", "theaters"
  add_foreign_key "jobs", "users"
  add_foreign_key "plays", "authors"
  add_foreign_key "productions", "theaters"
  add_foreign_key "space_agreements", "spaces"
  add_foreign_key "space_agreements", "theaters"
  add_foreign_key "stage_exits", "productions"
end
