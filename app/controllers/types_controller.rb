class TypesController < ApplicationController
    skip_before_action :authorize

    def create
        type = Type.create(params)
        render json: type, status: :created
    end

    def index
        types = Type.all
        render json: types
    end

    def show 
        type = find_type
        render json: type, include: [:plants], except: [:created_at, :updated_at]
    end


    private

    def find_type
        Type.find(params[:id])
    end

end
