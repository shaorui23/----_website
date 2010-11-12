class JobtypesController < ApplicationController
  # GET /jobtypes
  # GET /jobtypes.json
  def index
    @jobtype = Jobtype.all

    respond_to do |format|
      format.html # index.html.erb
      format.json  { render_json  @jobtype }
    end
  end

  def for_select 
    render_json Jobtype.for_select
  end

  # GET /jobtypes/1
  # GET /jobtypes/1.xml
  def show
    @jobtype = Jobtype.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json  { render_json  @jobtype }
    end
  end

  # GET /jobtypes/new
  # GET /jobtypes/new.xml
  def new
    @jobtype = Jobtype.new

    respond_to do |format|
      format.html # new.html.erb
      format.json  { render_json  @jobtype }
    end
  end

  # GET /jobtypes/1/edit
  def edit
    @jobtype = Jobtype.find(params[:id])
  end

  # POST /jobtypes
  # POST /jobtypes.xml
  def create
    @jobtype = Jobtype.new(params[:jobtype])
    
    if @jobtype.save
      render_json "success"
    else
      render_error "failure"
    end
  end

  # PUT /jobtypes/1
  # PUT /jobtypes/1.xml
  def update
    @jobtype = Jobtype.find(params[:id])

    if @jobtype.update_attributes(params[:unit])
      render_json "success"
    else
      render_error "failure"
    end
  end

  # DELETE /jobtypes/1
  # DELETE /jobtypes/1.xml
  def destroy
    @jobtype = Jobtype.find(params[:id])
    if @jobtype.destroy
      render_json "success"
    else
      render_error "failure"
    end
  end
end
