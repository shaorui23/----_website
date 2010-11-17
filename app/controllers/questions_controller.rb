class QuestionsController < ApplicationController
  # GET: /questions.format
  def index
    questions = Question.find(:all)
    respond_to do |format| 
      format.html
      format.json { render :json => questions }
    end
  end

  # POST: /questions/create.format
  def create
    question = params[:question]
    Question.create!(question)
    render :json => question
  rescue ActiveRecord::RecordInvalid => error
    render :json => { :message => error.message }, :status => 400
  end

  # DELETE: /questions/deletes.format
  def deletes
    questions = params[:question_ids]
    Question.delete(questions)
    render :json => questions
  end

  # Search: /questions/search_by_qcon
  # mouse
  def search_by_qcon
    qcon = '%' + params[:qcon] + '%'
    questions = Question.find(:all, :conditions => ["qcon like ?", qcon])
    render :json => questions
  end
end
