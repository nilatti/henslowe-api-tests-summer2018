class AuthorsController < ApiController
  before_action :set_author, only: [:show, :update, :destroy]

  # GET /authors
  def index
    @authors = Author.all

    render json: @authors.to_json(include: :plays)
  end

  # GET /authors/1
  def show
    render json: @author.to_json(include: :plays), location: @author
  end

  # POST /authors
  def create
    @author = Author.new(author_params)

    if @author.save
      render json: @author.to_json(include: :plays), status: :created, location: @author
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /authors/1
  def update
    puts "request to update received!"
    if @author.update(author_params)
      render json: @author.to_json(include: :plays), location: @author
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  # DELETE /authors/1
  def destroy
    @author.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_author
      @author = Author.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def author_params
      params.require(:author).permit(:birthdate, :deathdate, :nationality, :first_name, :middle_name, :last_name, :gender, :id)
    end
end
