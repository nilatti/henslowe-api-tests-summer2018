require "montrose"

class Rehearsal
  attr_accessor :end_time, :start_time, :notes
end
def build_recurring_rehearsals(end_date:, start_date:, days_of_week:, start_time:, end_time:, block_length:, break_length:) #block length should be in minutes
  Time.zone = 'America/Chicago'
  blocks = build_rehearsal_blocks(block_length: block_length, break_length: break_length, end_time: end_time, start_time: start_time)
  days = build_rehearsal_days(days_of_week: days_of_week, end_date: end_date, start_date: start_date)
  rehearsal_blocks = []
  days.each do |day|
    blocks.each do |block|
      r = Rehearsal.new
      r.end_time = Time.zone.parse("#{day.strftime('%F')} #{block[:start_time].strftime('%T')}")
      r.start_time = Time.zone.parse("#{day.strftime('%F')} #{block[:end_time].strftime('%T')}")
      r.notes = block[:notes]
      rehearsal_blocks << r
    end
  end
  rehearsal_blocks.each {|r| puts "#{r.start_time} - #{r.end_time} #{r.notes}"}
end

def build_rehearsal_blocks(block_length:, break_length:, end_time:, start_time:)
  rehearsal_blocks = []
  block_start_time = Time.parse(start_time)
  end_time = Time.parse(end_time)
  rehearsing = true
  until block_start_time >= end_time
    block = {
      end_time: Time.new,
      notes: '',
      start_time: Time.new,
    }
    block[:start_time] = block_start_time
    if rehearsing
      block[:end_time] = block[:start_time] + block_length.minutes
      block[:notes] = 'rehearsing'
    else
      block[:end_time] = block[:start_time] + break_length.minutes
      block[:notes] = 'break'
    end
    if block[:end_time] > end_time
      block[:end_time] = end_time
    end
    block_start_time = block[:end_time]
    rehearsing = !rehearsing
    rehearsal_blocks << block
  end
  return rehearsal_blocks
end

def build_rehearsal_days(days_of_week:, end_date:, start_date:)
  days = days_of_week.each {|day| day.to_sym}
  start_on = Date.parse(start_date)
  end_on = Date.parse(end_date)
  schedule = Montrose.every(:week, starts: start_on, until: end_on).on(days)
end

build_recurring_rehearsals(
  end_date: "2020-05-27",
  start_date: "2020-03-27",
  days_of_week: ["monday","wednesday","friday"],
  start_time: "18:00",
  end_time: "20:00",
  block_length: 25,
  break_length: 5
)
