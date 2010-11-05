# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_webSite_session',
  :secret      => 'bb846dbec108d9c5a43057a6892f7b1769a11362939a2ef0cbc85ce79e5cb140afd934fe30b85fd9da594fc2a700ef6b7e6fe2e4f62816170453a060e197f971'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
