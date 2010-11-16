# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{ruby-gmail}
  s.version = "0.0.8"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Daniel Parker"]
  s.cert_chain = ["-----BEGIN CERTIFICATE-----\nMIIDNjCCAh6gAwIBAgIBADANBgkqhkiG9w0BAQUFADBBMQ0wCwYDVQQDDARnZW1z\nMRswGQYKCZImiZPyLGQBGRYLYmVoaW5kbG9naWMxEzARBgoJkiaJk/IsZAEZFgNj\nb20wHhcNMDkxMTE5MDQ0NzIzWhcNMTAxMTE5MDQ0NzIzWjBBMQ0wCwYDVQQDDARn\nZW1zMRswGQYKCZImiZPyLGQBGRYLYmVoaW5kbG9naWMxEzARBgoJkiaJk/IsZAEZ\nFgNjb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDs+2PvSoBC5mCz\nNm95RXKOb/u+CmPA70DoG9cF0zipCie003Vm0DYL3Rtobcr32eMvHxkWoJ6xoz0I\nh74yNKtHjTTCxj86HWBPsE6xVMxVCftClndjCyKsiMiqvvp1wDNO0FFK+6LijmL3\n2Xkp4brWq1JO92y9vYct34R7o2X//+nwZs+sss+EYhNdvdUJfWy7tA5dghGdLvRn\nUhJJSAtTefkBCwO7bufLEt+n7wIRbiJJ5dDCwE3NIX4wUSrNeYwXGXA/Ybki+BUl\n3KJF9IC0XR9fY9DGF0FXBKrkfDlZRrnQOem2aIxeuln0KQLJXXJuDTQPHO+mK3EG\nUPhR7IAHAgMBAAGjOTA3MAkGA1UdEwQCMAAwCwYDVR0PBAQDAgSwMB0GA1UdDgQW\nBBQn32ZStKmqwFqs2vuglYzkvDzBZjANBgkqhkiG9w0BAQUFAAOCAQEAe3Z+iMmy\nIX9ChQW4hNNb1HOpgCMc2RL+vUwku9WE95dZ+BE4A6mOYTj5JXdYf4R4Z2vavr+d\nnwJWtXPeIBWxireb8gUU0DwqodYTpsmkj5LD1zIaZ59rXlwDA9O0V4fwE1iRG5MD\nmB7m8fT8WNOeg4AfjH4aSiHI1+HX1RQkc7KFdLotKnCevzYU6Jza5VUbXyJ+yCEH\nDFARN3mkfGI+18MRDEi39nK2O/bBd6Wf0cYPEKsGQjNNAIBtv9belepSMd1KKfQ2\nL7j8CnNDCrsHDe7/251D85wSvTH4Q/41NE5ahdCkkHwzDJeyhXpmNuUSswdn7woz\nteST6sOe8lUhZQ==\n-----END CERTIFICATE-----\n"]
  s.date = %q{2009-12-23}
  s.description = %q{A Rubyesque interface to Gmail, with all the tools you'll need. Search, read and send multipart emails; archive, mark as read/unread, delete emails; and manage labels.}
  s.email = ["gems@behindlogic.com"]
  s.extra_rdoc_files = ["History.txt", "Manifest.txt"]
  s.files = [".autotest", "History.txt", "lib/gmail/mailbox.rb", "lib/gmail/message.rb", "lib/gmail.rb", "lib/ietf/rfc2045.rb", "lib/ietf/rfc822.rb", "lib/mime/entity.rb", "lib/mime/message.rb", "lib/smtp_tls.rb", "Manifest.txt", "Rakefile", "README.markdown", "test/test_gmail.rb", "test/test_helper.rb"]
  s.homepage = %q{http://dcparker.github.com/ruby-gmail}
  s.post_install_message = %q{
[34mIf ruby-gmail saves you TWO hours of work, want to compensate me for, like, a half-hour?
Support me in making new and better gems:[0m [31;4mhttp://pledgie.com/campaigns/7087[0m

}
  s.rdoc_options = ["--main", "README.markdown"]
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{ruby-gmail}
  s.rubygems_version = %q{1.3.7}
  s.summary = %q{A Rubyesque interface to Gmail, with all the tools you'll need}
  s.test_files = ["test/test_gmail.rb", "test/test_helper.rb"]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<shared-mime-info>, [">= 0"])
      s.add_development_dependency(%q<hoe>, [">= 2.3.3"])
    else
      s.add_dependency(%q<shared-mime-info>, [">= 0"])
      s.add_dependency(%q<hoe>, [">= 2.3.3"])
    end
  else
    s.add_dependency(%q<shared-mime-info>, [">= 0"])
    s.add_dependency(%q<hoe>, [">= 2.3.3"])
  end
end
