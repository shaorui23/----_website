class EmploysController < ApplicationController
  def index
    @employers = GroupAn.employers
  end

end
