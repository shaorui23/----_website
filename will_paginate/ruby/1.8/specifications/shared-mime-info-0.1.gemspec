# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{shared-mime-info}
  s.version = "0.1"

  s.required_rubygems_version = nil if s.respond_to? :required_rubygems_version=
  s.authors = ["Hank Lords"]
  s.autorequire = %q{rake}
  s.cert_chain = nil
  s.date = %q{2006-09-24}
  s.email = %q{hanklords@gmail.com}
  s.files = ["lib/shared-mime-info.rb", "rakefile", "copying.txt"]
  s.require_paths = ["lib"]
  s.required_ruby_version = Gem::Requirement.new("> 0.0.0")
  s.rubygems_version = %q{1.3.7}
  s.summary = %q{Library to guess the MIME type of a file with both filename lookup and magic file detection}

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 1

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
