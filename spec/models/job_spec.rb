require 'rails_helper'

RSpec.describe Job, type: :model do
  it "has a valid factory" do
    expect(build(:job)).to be_valid
  end

  let(:job) { build(:job) }

  describe "ActiveModel validations" do
    it "checks that start date is before end date" do
      job_with_bad_dates = build(:job, end_date: Faker::Date.between(from: 2.years.ago, to: 1.year.ago), start_date: Faker::Date.between(from: 1.year.ago, to: 3.months.ago))
      job_with_bad_dates.valid?
      expect(job_with_bad_dates.errors[:end_date]).to include("can't be before start date")

      job.valid?
      expect(job).to be_valid
    end
  end

  describe "ActiveRecord associations" do
    it { expect(job).to belong_to(:character).optional }
    it { expect(job).to belong_to(:production).optional }
    it { expect(job).to belong_to(:specialization).optional }
    it { expect(job).to belong_to(:theater).optional }
    it { expect(job).to belong_to(:user).optional }
  end
  it "scopes function (basic)" do
    production = build(:production)
    specialization = build(:specialization)
    actor_specialization = build(:specialization, title: 'Actor')
    auditioner_specialization = build(:specialization, title: 'Auditioner')
    theater = build(:theater)
    user = build(:user)
    actor_jobs = create_list(:job, 3, specialization: actor_specialization )
    auditioner_jobs = create_list(:job, 3, specialization: auditioner_specialization )
    actor_and_auditioner_jobs = actor_jobs + auditioner_jobs
    production_jobs = create_list(:job, 3, production: production )
    specialization_jobs = create_list(:job, 3, specialization: specialization )
    theater_jobs = create_list(:job, 3, theater: theater )
    user_jobs = create_list(:job, 3, user: user )
    expect(Job.specialization(specialization.id)).to match_array(specialization_jobs)
    expect(Job.theater(theater.id)).to match_array(theater_jobs)
    expect(Job.user(user.id)).to match_array(user_jobs)
    expect(Job.production(production.id)).to match_array(production_jobs)
    expect(Job.specialization(specialization.id)).to match_array(specialization_jobs)
    expect(Job.actor).to match_array(actor_jobs)
    expect(Job.actor_or_auditioner).to match_array(actor_and_auditioner_jobs)
  end

  it "scopes function (complex)" do
    production = build(:production)
    theater = build(:theater)
    actor_specialization = build(:specialization, title: 'Actor')
    auditioner_specialization = build(:specialization, title: 'Auditioner')
    actor_jobs_for_production = create_list(:job, 3, specialization: actor_specialization, production: production)
    auditioner_jobs_for_production = create_list(:job, 3, specialization: auditioner_specialization, production: production)
    actor_jobs_for_theater = create_list(:job, 3, specialization: actor_specialization, theater: theater)
    auditioner_jobs_for_theater = create_list(:job, 3, specialization: auditioner_specialization, theater: theater)
    expect(Job.actor_for_production(production.id)).to match_array(actor_jobs_for_production)
    expect(Job.actor_or_auditioner_for_production(production.id)).to match_array(actor_jobs_for_production + auditioner_jobs_for_production)
    expect(Job.actor_or_auditioner_for_theater(theater.id)).to match_array(actor_jobs_for_theater + auditioner_jobs_for_theater)
  end
end
