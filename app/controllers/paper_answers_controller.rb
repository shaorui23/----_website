class PaperAnswersController < ApplicationController

  # GET:/paper_answers.json
  # paInfo: paper answer information
  def index
    paInfo = GroupAn.paperInfo
    render :json => paInfo
  end

  # GET:/paper_answers/show_p_and_a.json
  # p_and_a: paper and answers
  # pas: paper answers
  # pq:  paper questions
  def show_p_and_a
    pas = GroupAn.find(params[:id])
    pq = pas.group.jsonQuestions
    render :json => { :paper_answers => pas, :paper_questions => pq, :question_count => pas.group.questions.count }
  end

  # GET:/paper_answers/show_in_job_or_mark
  # TODO:用于实现问卷中心的复合查询的action
  #def show_in_job_or_mark
  #  job_id = params[:job_id]
  #  mark = params[:markOrNot]
  #end

  # POST:/paper_answers/give_mark
  def give_mark
    GroupAn.find(params[:paId]).update_attributes({ :gmark => params[:mark] })
    render :json => { :message => 'success' }
  end
end
