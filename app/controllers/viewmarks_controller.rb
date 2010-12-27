class ViewmarksController < ApplicationController
  def index
    @viewmarks = GroupAn.interviewers
  end

end
