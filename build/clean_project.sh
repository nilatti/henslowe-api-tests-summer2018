#!/bin/bash
set -e -x
# rest of the script
#!/bin/bash
set -e -x
# rest of the script
echo 'Building SIF Project'
source "/var/go/.rvm/scripts/rvm"
AGENT_INSTALL_DIR="/var/lib/go-agent/pipelines"
WORKSPACE="$AGENT_INSTALL_DIR/$GO_PIPELINE_NAME"
echo "workspace is $WORKSPACE"
DOCKER_HOME="$WORKSPACE/docker"
echo "Docker home is $DOCKER_HOME"





echo 'stop rails'
#kill -9 $(cat tmp/pids/server.pid)

echo 'remove pid'
#rm tmp/pids/server.pid

echo 'not cleaning up'
