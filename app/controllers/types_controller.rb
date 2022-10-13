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

end
