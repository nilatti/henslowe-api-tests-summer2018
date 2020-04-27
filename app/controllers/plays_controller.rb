class PlaysController < ApiController
  before_action :authenticate_user!
  before_action :set_author, only: %i[index, create]
  before_action :set_play, only: %i[show update destroy]
  # GET /plays
  def index
    if @author
      json_response(@author.plays.as_json(only: %i[id title]))
    else
      json_response(Play.all.as_json(only: %i[id title]))
    end
  end

  # GET /plays/1
  def show
    @play = Play.includes(
      :author,
        [
          characters: [:lines],
          character_groups: [:lines],
          acts: [
            scenes: [
              french_scenes:
                [
                  :characters,
                  :character_groups,
                  entrance_exits:
                  [
                    :stage_exit,
                    :characters,
                    :character_groups
                  ],
                  lines: [
                    :words
                  ],
                  on_stages: [
                    :character, :character_group
                  ]
                ]
              ]
            ]
          ]
        ).find(params[:id])
    render json: @play.as_json(include:
      [
        :author,
        characters: {include: :lines},
        character_groups: {include: :lines},
        acts: {
          include: {
            scenes: {
              include: {
                french_scenes: {
                  include: [
                    :characters,
                    :character_groups,
                    entrance_exits: {
                      include: [
                          :stage_exit,
                          :characters,
                          :character_groups,
                        ]
                    },
                    lines: {
                      include: :words
                    },
                    on_stages: {
                      include: [:character, :character_group]
                    }
                  ]
                }
              }
            }
          }
        }
        ]
      )
  end

  # POST /plays
  def create
    @play = Play.new(play_params)

    if @play.save
      render json: @play, status: :created, location: @author
    else
      render json: @play.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /plays/1
  def update
    @play.update(play_params)
    render json: @play.as_json(include:
      [
        :author,
        :characters,
        :character_groups,
        acts: {
          include: {
            scenes: {
              include: {
                french_scenes: {
                  include: [
                    :characters,
                    :character_groups,
                    entrance_exits: {
                      include: [
                          :stage_exit,
                          :characters,
                          :character_groups,
                        ]
                    },
                    on_stages: {
                      include: [:character, :character_group]
                    }
                  ]
                }
              }
            }
          }
        }
        ]
      )
  end

  # DELETE /plays/1
  def destroy
    @play.destroy
    head :no_content
  end

  def play_act_on_stages
    @play = Play.includes(acts: [scenes: [french_scenes: [:on_stages]]]).find(params[:play])
    @acts = Act.play_order(@play.acts)
    render json: @acts.as_json(methods: :on_stages)
  end

  def play_french_scene_on_stages
    @play = Play.includes(french_scenes: [:on_stages]).find(params[:play])
    @french_scenes = FrenchScene.play_order(@play.french_scenes)
    render json: @french_scenes.as_json(include: :on_stages, methods: :pretty_name)
  end

  def play_on_stages
    @play = Play.includes(acts: [scenes: [french_scenes: [:on_stages]]]).find(params[:play])
    render json: @play.as_json(methods: :find_on_stages)
  end

  def play_scene_on_stages
    @play = Play.includes(scenes: [french_scenes: [:on_stages]]).find(params[:play])
    @scenes = Scene.play_order(@play.scenes)
    render json: @scenes.as_json(methods: [:pretty_name, :on_stages])
  end

  def play_script
    @play = Play.includes(:characters, :character_groups, acts: [scenes: [french_scenes: [:stage_directions, :sound_cues, lines: [:character, :words]]]]).find(params[:play])

    render json: @play.as_json(include:
      [
        :characters,
        :character_groups,
        acts: {
          include: {
            scenes: {
              include: {
                french_scenes: {
                  include: [
                    :stage_directions,
                    :sound_cues,
                    lines: {
                      include: [:character, :words]
                    }
                  ]
                }
              }
            }
          }
        }
        ]
      )
  end

  def play_skeleton
    puts "play_params"
    puts params[:play]
    @play = Play.includes(acts: [scenes: [:french_scenes]]).find(params[:play])

    render json: @play.as_json(include: {
      production: {only: [:lines_per_minute]},
      characters: {only: [:name, :id]},
      acts: {include: {scenes: {include: {french_scenes: {only: [:id, :number]}}, only: [:id, :number]}}, only: [:id, :number]}
      },
      only: [:canonical, :id, :title]
    )
  end

  def play_titles
    @plays = Play.where(canonical: true)
    render json: @plays.as_json(only: %i[id title])
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_author
    if params[:play][:author_id]
      @author = Author.find(params[:play][:author_id])
    elsif params[:author_id]
      @author = Author.find(params[:author_id])
    end
  end

  def set_play
    if @author
      @play = @author.plays.find_by!(id: params[:id])
    else
      @play = Play.find(params[:id])
    end

  end

  # Only allow a trusted parameter "white list" through.
  def play_params
    params.require(:play).permit(
      :author_id,
      :canonical,
      :date,
      :synopsis,
      :text_notes,
      :title,
      genre: []
    )
  end
end
