# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{populator}
  s.version = "0.2.5"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.2") if s.respond_to? :required_rubygems_version=
  s.authors = ["Ryan Bates"]
  s.date = %q{2008-10-01}
  s.description = %q{Mass populate an Active Record database.}
  s.email = %q{ryan (at) railscasts (dot) com}
  s.extra_rdoc_files = ["CHANGELOG", "lib/populator/adapters/abstract.rb", "lib/populator/adapters/sqlite.rb", "lib/populator/factory.rb", "lib/populator/model_additions.rb", "lib/populator/random.rb", "lib/populator/record.rb", "lib/populator.rb", "LICENSE", "README", "tasks/deployment.rake", "tasks/spec.rake", "TODO"]
  s.files = ["CHANGELOG", "lib/populator/adapters/abstract.rb", "lib/populator/adapters/sqlite.rb", "lib/populator/factory.rb", "lib/populator/model_additions.rb", "lib/populator/random.rb", "lib/populator/record.rb", "lib/populator.rb", "LICENSE", "Manifest", "Rakefile", "README", "spec/database.yml", "spec/example_database.yml", "spec/models/category.rb", "spec/models/product.rb", "spec/populator/factory_spec.rb", "spec/populator/model_additions_spec.rb", "spec/populator/random_spec.rb", "spec/populator/record_spec.rb", "spec/README", "spec/spec.opts", "spec/spec_helper.rb", "tasks/deployment.rake", "tasks/spec.rake", "TODO", "populator.gemspec"]
  s.homepage = %q{http://github.com/ryanb/populator}
  s.rdoc_options = ["--line-numbers", "--inline-source", "--title", "Populator", "--main", "README"]
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{populator}
  s.rubygems_version = %q{1.3.7}
  s.summary = %q{Mass populate an Active Record database.}

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 2

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
