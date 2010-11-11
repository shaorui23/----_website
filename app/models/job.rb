# == Schema Information
#
# Table name: jobs
#
#  id            :integer(4)      not null, primary key
#  jname         :string(255)
#  jdesc         :string(255)
#  created_at    :datetime
#  updated_at    :datetime
#  created_date  :date
#  closed_date   :date
#  position_type :string(255)
#  job_number    :integer(4)
#  requirement   :string(255)
#  state         :string(255)
#

class Job < ActiveRecord::Base
  has_many :groups

  #Comment: Mouse
  #TODO 整理完前台代码后，需要最验证错误信息统一处理
  validates_presence_of :jname            , :message => "职位名称不能为空" 
  validates_presence_of :job_number       , :message => "招聘人数不能为空"
  validates_presence_of :position_type    , :message => "职位类型不能为空" 
  validates_presence_of :closed_date      , :message => "截止日期不能为空" 
  
  before_validation_on_create :default_state

  #主页搜索显示前五记录职位
  named_scope :first_five_records, :conditions => "state = 'ing' and job_number > 0", :limit => 5


  private

  def default_state
    self.state = 'ing'  # 状态待修改
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
