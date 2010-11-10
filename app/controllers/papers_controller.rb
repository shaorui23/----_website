class PapersController < ApplicationController
#GET: /papers
  def index
    papers = Group.find(:all)

    papers.collect! do |paper|
      paper.attributes.merge!({ :job_name => paper.job.jname })
    end

    render :json => papers
  end
#Post: /papers
  def create
    pDatas = params[:pDatas]
    gbIds = pDatas[:qbIds]
    jobId = pDatas[:jobId]
    newGroup = Group.create!(jobId)

    gbIds.each do |gbId|
      gbId.merge!({ :group_id => newGroup.id })
    end
    GroupsQuestions.create(gbIds)

    render :json => { :message => 'success' }
  end
#GET: /papers/show_questions:id
    def show_questions
      oldPaper = Group.find(params[:id])
      questions = oldPaper.questions
      render :json => questions
    end
end
