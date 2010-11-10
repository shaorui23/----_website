class AddResumeData < ActiveRecord::Migration
  def self.up
    Resume.delete_all
    Resume.create(
      :rname     => '姓名',
      :rsex      => '性别',
      :rbirth    => '出生年月',
      :rmari_sta => '婚姻状况',
      :rrace     => '民族',
      :rblood    => '血型',
      :rhei      => '身高',
      :rwei      => '体重',
      :rpoli     => '政治面貌',
      :riden     => '身份证号',
      :rpho      => '联系电话',
      :rmail     => 'E-mail',
      :raddr     => '家庭住址',
      :rprof     => '专业',
      :rexp      => '经历',
      :redu      => '学历',
      :rskill    => '技能',
      :reva      => '自我评价'
    )
  end

  def self.down
    Resume.delete_all
  end
end
