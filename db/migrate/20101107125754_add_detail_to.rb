class AddDetailTo < ActiveRecord::Migration
  def self.up
      add_column  :resume_ans,  :rname_a,      :string
      add_column  :resume_ans,  :rsex_a,       :string
      add_column  :resume_ans,  :rbirth_a,     :date
      add_column  :resume_ans,  :rmari_sta_a,  :string
      add_column  :resume_ans,  :rrace_a,      :string
      add_column  :resume_ans,  :rblood_a,     :string
      add_column  :resume_ans,  :rhei_a,       :string
      add_column  :resume_ans,  :rwei_a,       :string
      add_column  :resume_ans,  :rpoli_a,      :string
      add_column  :resume_ans,  :riden_a,      :string
      add_column  :resume_ans,  :rpho_a,       :string
      add_column  :resume_ans,  :rmail_a,      :string
      add_column  :resume_ans,  :raddr_a,      :string
      add_column  :resume_ans,  :rprof_a,      :string
  end

  def self.down
      remove_column  :resume_ans,  :rname_a    
      remove_column  :resume_ans,  :rsex_a     
      remove_column  :resume_ans,  :rbirth_a   
      remove_column  :resume_ans,  :rmari_sta_a
      remove_column  :resume_ans,  :rrace_a   
      remove_column  :resume_ans,  :rblood_a   
      remove_column  :resume_ans,  :rhei_a     
      remove_column  :resume_ans,  :rwei_a     
      remove_column  :resume_ans,  :rpoli_a    
      remove_column  :resume_ans,  :riden_a    
      remove_column  :resume_ans,  :rpho_a     
      remove_column  :resume_ans,  :rmail_a    
      remove_column  :resume_ans,  :raddr_a    
      remove_column  :resume_ans,  :rprof_a
  end
end
