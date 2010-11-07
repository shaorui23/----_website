class AddDetailToResume < ActiveRecord::Migration
  def self.up
      add_column  :resumes,  :rname,      :string
      add_column  :resumes,  :rsex,       :string
      add_column  :resumes,  :rbirth,     :date
      add_column  :resumes,  :rmari_sta,  :string
      add_column  :resumes,  :rrace,      :string
      add_column  :resumes,  :rblood,     :string
      add_column  :resumes,  :rhei,       :string
      add_column  :resumes,  :rwei,       :string
      add_column  :resumes,  :rpoli,      :string
      add_column  :resumes,  :riden,      :string
      add_column  :resumes,  :rpho,       :string
      add_column  :resumes,  :rmail,      :string
      add_column  :resumes,  :raddr,      :string
      add_column  :resumes,  :rprof,      :string
  end

  def self.down
      remove_column  :resumes,  :rname    
      remove_column  :resumes,  :rsex     
      remove_column  :resumes,  :rbirth   
      remove_column  :resumes,  :rmari_sta
      remove_column  :resumes,  :rrace   
      remove_column  :resumes,  :rblood   
      remove_column  :resumes,  :rhei     
      remove_column  :resumes,  :rwei     
      remove_column  :resumes,  :rpoli    
      remove_column  :resumes,  :riden    
      remove_column  :resumes,  :rpho     
      remove_column  :resumes,  :rmail    
      remove_column  :resumes,  :raddr    
      remove_column  :resumes,  :rprof    
  end
end
