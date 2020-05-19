#!/bin/bash
set -e -x
# rest of the script
#!/bin/bash
set -e -x
# rest of the script
source "/usr/local/rvm/scripts/rvm"
echo 'Building Henslowe API'
AGENT_INSTALL_DIR="/var/lib/go-agent/pipelines"
WORKSPACE="$AGENT_INSTALL_DIR/$GO_PIPELINE_NAME"
# rvm use ruby-2.6.5@henslowe
gem install bundler:2.0.2
bundle install
echo 'starting rails'
rails s -p 3001 -b -d

# echo 'rake seeds'
# rake db:drop db:create db:schema:load
# rake db:seed_fu
echo 'get new db migrations'
rake db:migrate

bundle exec sidekiq
# rake import_users
# rake create_system_active
# rake db:migrate
# echo 'seeds raked'

# echo 'update crontab'
# whenever --update-crontab
#
#
# echo 'replacing production with development'
# sudo sed -i -e 's/production/development/g' /var/spool/cron/go
#in here is where we should add something to edit /var/spool/cron/go to change "-e production" to "-e development"
