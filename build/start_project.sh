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
# rails s -p 3001 -b -d
thin -p 3001 -a 127.0.0.1 -P tmp/pids/thin.pid -l logs/thin.log -d start

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

# to start all things or pull a build manually:
# Be root (sudo su)
# stop nginx (systemctl stop nginx)
# be go (su - go)
# nav to /var/lib/go-agent/pipelines/henslowe-client
# git fetch
# git pull origin master
# npm run build
# nav to /var/lib/go-agent/pipelines/henslowe-api
# thin stop
# git fetch
# git pull origin master
# may have to rename server_database.yml to database.yml
# rake db:migrate
# thin -p 3001 -a 127.0.0.1 -P tmp/pids/thin.pid -l logs/thin.log -d start
# screen (that's all, just type screen)
# bundle exec sidekiq -- at some point, need to daemonize this and not run as screen, but it's okay for now.
# ctrl+a+d
# be sudo
# start nginx (systemctl start nginx)
