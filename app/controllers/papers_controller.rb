class PapersController < ApplicationController
  #Post: /papers
  def create
    pDatas = params[:pDatas]
    debugger
    gbIds = pDatas
    Group.create!(paper)
    render :json => { :message => 'success' }
  end
end
