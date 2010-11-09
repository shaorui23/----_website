class PapersController < ApplicationController
  #Post: /papers
  def create
    paper = params[:paper]
    Paper.create!(paper)
    render :json => { :message => 'success' }
  end
end
