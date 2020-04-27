class BuildRehearsalScheduleWorker
  include Sidekiq::Worker

  def perform(block_length, break_length, days_of_week, end_date, end_time, production_id, time_between_breaks, start_date, start_time)
    puts block_length
    puts start_time
    block_length = block_length.to_i
    break_length = break_length.to_i
    production_id = production_id.to_i
    time_between_breaks = time_between_breaks.to_i
    days_of_week = days_of_week.split(',')
    BuildRehearsalScheduleBlocks.new(block_length: block_length, break_length: break_length, days_of_week: days_of_week, end_date: end_date, end_time: end_time, production_id: production_id, time_between_breaks: time_between_breaks, start_date: start_date, start_time: start_time).run
  end

  def cancelled?
    Sidekiq.redis {|c| c.exists("cancelled-#{jid}") }
  end

  def self.cancel!(jid)
    Sidekiq.redis {|c| c.setex("cancelled-#{jid}", 86400, 1) }
  end
end
