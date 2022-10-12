class TypesController < ApplicationController

    def create
        type = Type.create(params)
        render json: type, status: :created
    end

    def index
        types = Type.all
        render json: types
    end

end
