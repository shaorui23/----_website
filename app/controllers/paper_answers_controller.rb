class PaperAnswersController < ApplicationController

  # GET: /paper_answers.json
  # paInfo: paper answer information
  def index
    paInfo = GroupAn.paperInfo
    render :json => paInfo
  end

  # GET: /paper_answers/show_p_and_a.json
  # p_and_a: paper and answers
  # pas: paper answers
  # pq:  paper questions
  def show_p_and_a
    pas = GroupAn.find(params[:id])
    pq = pas.group.jsonQuestions
    render :json => { :paper_answers => pas, :paper_questions => pq, :question_count => pas.group.questions.count,:evaluate => pas.evaluate }
  end

  # GET: /paper_answers/show_in_job_or_mark
  # pas: paper answers
  # mouse
  def search_limit
    myparams = {}
    myparams = params[:params]
    pas = []
    pas = GroupAn.paperInfo myparams
    render :json => pas
  end

  # POST: /paper_answers/give_mark
  def give_mark
    GroupAn.find(params[:paId]).update_attributes({ :gmark => params[:mark] })
    render :json => { :message => 'success' }
  end

  #POST: /paper_answers/give_evaluate
  def give_evaluate
    GroupAn.find(params[:paId]).update_attributes({ :evaluate => params[:evaluate] })
    render :json => { :message => 'success' }
  end

  #POST: /paper_answers/employ
  def employ
    GroupAn.find(params[:paId]).update_attributes({ :state => params[:state] })
    render :json => { :message => 'success' }
    
  end
end
