class PlayCopyWorker
  include Sidekiq::Worker

  def perform(play_id, production_id)
    puts "copy play for production called in worker"
    CopyPlayForProduction.new(play_id: play_id, production_id: production_id).run
    # Do something
  end
end
