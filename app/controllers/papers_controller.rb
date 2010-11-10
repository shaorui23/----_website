class PapersController < ApplicationController
  #Post: /papers
  def create
    pDatas = params[:pDatas]
    debugger
    gbIds = pDatas[:qbIds]
    jobId = pDatas[:jobId]
    newGroup = Group.create!(jobId)

    gbIds.each do |gbId|
      gbId.merge!({ :group_id => newGroup.id })
    end
    GroupsQuestions.create(gbIds)

    render :json => { :message => 'success' }
  end
end
