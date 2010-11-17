class PapersController < ApplicationController

  # GET: /papers
  def index
    papers = Group.find(:all)

    papers.collect! do |paper|
      paper.attributes.merge!({ :job_name => paper.job.jname })
    end

    render :json => papers
  end

  # Post: /papers
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

  # GET: /papers/show_questions:id
  def show_questions
    oldPaper = Group.find(params[:id])
      questions = oldPaper.questions
    render :json => questions
  end

  # Post: /papers/be_active
  # 将试卷的状态改为使用中
  def be_active
    beActiver = Group.find(params[:id])
    actives = Group.job_unactivelize(params[:job_id])
    beActiver.update_attributes({ :active => true })
    render :json => beActiver
  end

  # Post: /papers/be_unactive
  # 将试卷的状态改为禁用
  def be_unactive
    paper = Group.find(params[:id])
    paper.update_attributes({ :active => false })
    render :json => paper
  end

  # Get: /papers/search_by_job.job_id
  # mouse
  def search_by_job
    job_name = params[:jobName]
    papers = Job.find_by_jname(job_name).groups

    papers.collect! do |paper|
      paper.attributes.merge!({ :job_name => job_name })
    end

    render :json => papers
  end
end
