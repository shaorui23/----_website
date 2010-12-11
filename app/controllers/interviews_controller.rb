class InterviewsController < ApplicationController
  def index
    @interviewers = GroupAn.interviewers
  end
end
