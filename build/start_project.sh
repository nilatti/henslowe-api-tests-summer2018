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
rvm use ruby-2.6.5@henslowe
bundle install
echo 'starting rails'
rails s -d -b 0.0.0.0

# echo 'rake seeds'
rake db:drop db:create db:schema:load
# rake db:seed_fu
echo 'get new db migrations'
rake db:migrate
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
