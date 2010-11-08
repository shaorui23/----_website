# == Schema Information
#
# Table name: resume_ans
#
#  id          :integer(4)      not null, primary key
#  rexp_a      :string(255)
#  redu_a      :string(255)
#  rskill_a    :string(255)
#  reva_a      :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#  rname_a     :string(255)
#  rsex_a      :string(255)
#  rbirth_a    :date
#  rmari_sta_a :string(255)
#  rrace_a     :string(255)
#  rblood_a    :string(255)
#  rhei_a      :string(255)
#  rwei_a      :string(255)
#  rpoli_a     :string(255)
#  riden_a     :string(255)
#  rpho_a      :string(255)
#  rmail_a     :string(255)
#  raddr_a     :string(255)
#  rprof_a     :string(255)
#

class ResumeAns < ActiveRecord::Base
end
