class PlayCopyWorker
  include Sidekiq::Worker

  def perform(play_id, production_id)
    CopyPlayForProduction.new(play_id: play_id, production_id: production_id).run
  end
  def cancelled?
    Sidekiq.redis {|c| c.exists("cancelled-#{jid}") }
  end

  def self.cancel!(jid)
    Sidekiq.redis {|c| c.setex("cancelled-#{jid}", 86400, 1) }
  end
end
