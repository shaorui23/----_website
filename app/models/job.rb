# == Schema Information
#
# Table name: jobs
#
#  id           :integer(4)      not null, primary key
#  jname        :string(255)
#  jdesc        :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#  created_date :date
#  closed_date  :date
#  jobtype_id   :integer(4)
#  job_number   :integer(4)
#  requirement  :string(255)
#  state        :string(255)
#
# Associations:
#  groups       :has_many        [Group(job_id)] 
#  jobtype      :belongs_to      Jobtype
#                by              jobtype_id 
#

class Job < ActiveRecord::Base
  has_many :groups
  belongs_to :jobtype

  #Comment: Mouse
  #TODO 整理完前台代码后，需要最验证错误信息统一处理
  validates_presence_of :jname            , :message => "职位名称不能为空" 
  validates_presence_of :job_number       , :message => "招聘人数不能为空"
  validates_presence_of :position_type    , :message => "职位类型不能为空" 
  validates_presence_of :closed_date      , :message => "截止日期不能为空" 
  
  before_validation_on_create :default_state

  #主页搜索显示前五记录职位
  named_scope :first_five_records, :conditions => "state = 'ing' and job_number > 0", :limit => 5

  state_machine :initial => :unpush do 
    event(:push_job) { transition [:unpush, :delelte] => :ing }
 #  event(:) { transition [:ing] => :full }
 #  event(:) { transition [:ing] => :delay }
 #  event(:) { transition [:unpush, :full, :delay] => :delete }
  end

  StateCn = { 
    "ing"    => "招聘ing",
    "unpush" => "未发布",
    "full"   => "已招满",
    "delay"  => "已截止"
  }

  # eric
  # 添加中文状态
  def self.state_cn
    rs = []
    #StateCn.each { |k, v|  rs << { k => v } }
    rs = StateCn
    rs
  end

  def position_type
    self.jobtype.job_type
  end

  private

  def default_state
    self.state = 'unpush'  # 状态待修改
  end

end


Job.blueprint do  
  jname               { Faker::Lorem.words.first }
  jdesc               { Faker::Lorem.sentence }
  created_date        { Date.today }
  closed_date         { rand(100) + 20}
  position_type       { /'jingli'|'sdf'/.gen }
  job_number          { rand(100) + 20} 
  requirement         { Faker::Lorem.sentence }
  state               { /'ing'|'closing'|'over'/.gen }
end
