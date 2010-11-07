class JobsController < ApplicationController

#GET /jobs
  def index
     @job = Job.all
      respond_to do |format|
        format.html  
        format.json  { render_json @job }
    end
  end

end
