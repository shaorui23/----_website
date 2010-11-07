class QuestionsController < ApplicationController
  #GET: /questions.format
  def index
    questions = Question.find(:all)
    respond_to do |format| 
      format.html
      format.json { render :json => questions }
    end
  end

  #POST: /questions/create.format
  def create
    question = params[:question]
    Question.create!(question)
    render :json => question
  end

  #DELETE: /questions/deletes.format
  def deletes
    questions = params[:question_ids]
    Question.delete(questions)
    render :json => questions
  end
end
