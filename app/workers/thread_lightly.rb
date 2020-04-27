class ThreadLightly
  include Sidekiq::Worker

  def perform(tid)
    puts "I'm %s, and I'll be terminating TID: %s..." % [self.class, tid]
    Thread.list.each {|t|
      if t.object_id.to_s == tid
        puts "Goodbye %s!" % t
        t.exit
      end
    }
  end
end
