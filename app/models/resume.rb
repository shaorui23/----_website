# == Schema Information
#
# Table name: resumes
#
#  id         :integer(4)      not null, primary key
#  rexp       :string(255)
#  redu       :string(255)
#  rskill     :string(255)
#  reva       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  rname      :string(255)
#  rsex       :string(255)
#  rbirth     :date
#  rmari_sta  :string(255)
#  rrace      :string(255)
#  rblood     :string(255)
#  rhei       :string(255)
#  rwei       :string(255)
#  rpoli      :string(255)
#  riden      :string(255)
#  rpho       :string(255)
#  rmail      :string(255)
#  raddr      :string(255)
#  rprof      :string(255)
#

class Resume < ActiveRecord::Base
end
