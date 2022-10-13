class PlantsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    skip_before_action :authorize, only: [:index, :show]
    protect_from_forgery with: :null_session

    def index
        plants = Plant.all
        render json: plants
    end

    def show
        plant = Plant.find(params[:id])
        render json: plant
    end

    def create
        user = User.find(session[:user_id])
        plant = user.plants.create!(plant_params)
        render json: plant, status: :created
    end

    def update
        plant = Plant.find(params[:id])
        plant.update(plant_params)
        render json: plant
    end

    def destroy
        plant = Plant.find(params[:id])
        plant.destroy
        head :no_content
    end

    private

    def plant_params
        params.permit(:name, :type_id, :image_url, :description)
    end
    
    def render_not_found_response
        render json: {error: "Plant not found"}, status: :not_found
    end
end
