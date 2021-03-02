class ProductionSerializer
    include JSONAPI::Serializer
    attributes :start_date, :end_date, :lines_per_minute
    belongs_to :theater
    has_many :jobs
  
    has_one :play
  
    has_many :stage_exits
    has_many :rehearsals
end

