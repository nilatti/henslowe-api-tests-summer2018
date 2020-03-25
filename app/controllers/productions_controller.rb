class ProductionsController < ApiController
  before_action :set_production, only: [:show, :update, :destroy]

  # GET /productions
  def index
    @productions = Production.all

    json_response(@productions.as_json(include: [:play, :theater]))
    # render json: @productions
  end

  # GET /productions/1
  def show
    @production = Production.includes(
      :theater,
      :rehearsals,
      :stage_exits,
      [
        play:
        [
          characters: [:lines],
        character_groups: [:lines],
        acts: [
          scenes: [
            french_scenes:
              [
                :characters,
                :character_groups,
                :lines,
                entrance_exits:
                [
                  :stage_exit,
                  :characters,
                  :character_groups
                ],
                on_stages: [
                  :character, :character_group
                ]
              ]
            ]
          ]
        ],
        jobs: [
          :specialization,
          :theater,
          user: [:conflicts],
          character: [
            :lines
          ]
        ]
      ]
    ).find(params[:id])

    json_response(@production.as_json(include:
        [
          :theater,
          :rehearsals,
          :stage_exits,
          play: {
            include: [
              characters: {
                include: :lines
              },
              acts: {
                include: [
                  scenes: {
                    include: [
                      french_scenes: {
                        include: [
                            on_stages: {
                              include: :character
                            },
                            entrance_exits: {
                          #   include: [
                          #     french_scene: {
                          #       include: [
                          #         scene: {
                          #           include: :act
                          #         }
                          #       ]
                          #       }
                          #     ]
                        },
                      ],
                        methods: :pretty_name
                      }
                    ],
                    methods: :pretty_name
                  }
                ]
              }
            ]
          },
          jobs: {
            include: [
              :specialization,
              :theater,
              user: {
                include: :conflicts
              },
              character: {
                include: :lines
              }
            ]
          }
        ]
      )
    )
  end

  # POST /productions
  def create
    @production = Production.new(production_params)

    if @production.save
      json_response(@production.as_json(include: [:theater]), :created)
      PlayCopyWorker.perform_async(production_params['play_id'], @production.id)
    else
      render json: @production.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /productions/1
  def update
    if @production.update(production_params)
      json_response(@production.as_json(include:
          [
            :theater,
            :stage_exits,
            play: {
              include: [
                :characters,
                acts: {
                  include: [
                    scenes: {
                      include: [
                        french_scenes: {
                          include: [
                            entrance_exits: {
                              include: [
                                french_scene: {
                                  include: [
                                    scene: {
                                      include: :act
                                    }
                                  ]
                                  }
                                ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            jobs: {
              include: [
                :character,
                :specialization,
                :theater,
                :user
              ]
            }
          ]
        )
      )
    else
      render json: @production.errors, status: :unprocessable_entity
    end
  end

  # DELETE /productions/1
  def destroy
    @production.destroy
  end

  def production_names
    @productions = Production.all
    render json: @productions.as_json(only: %i[id name], include: [:theater, :play])
  end

  def get_productions_for_theater
    @productions = Production.where(theater: params[:theater])
    json_response(@productions.as_json(include: [:play, :theater]))
  end

  def build_rehearsal_schedule
    set_production
    json_response(@production.as_json(include: [:theater]))
    # BuildRehearsalScheduleWorker.perform_async(params[:rehearsal_block_length])
    BuildRehearsalScheduleWorker.perform_async(params[:rehearsal_block_length], params[:rehearsal_break_length], params[:rehearsal_days_of_week], params[:rehearsal_end_date], params[:rehearsal_end_time], @production.id, params[:rehearsal_time_between_breaks], params[:rehearsal_start_date], params[:rehearsal_start_time])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_production
      @production = Production.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def production_params
      params.require(:production).permit(
        :end_date,
        :id,
        :lines_per_minute,
        :play_id,
        :rehearsal_block_length,
        :rehearsal_break_length,
        :rehearsal_days_of_week,
        :rehearsal_end_date,
        :rehearsal_end_time,
        :rehearsal_start_date,
        :rehearsal_end_time,
        :rehearsal_time_between_breaks,
        :theater_id,
        :start_date,
      )
    end
end
