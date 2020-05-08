#!/bin/bash
set -e -x
# rest of the script
#!/bin/bash
set -e -x
# rest of the script
echo 'Stopping Rails Server'
source "/usr/local/rvm/bin/rvm"
AGENT_INSTALL_DIR="/var/lib/go-agent/pipelines"
WORKSPACE="$AGENT_INSTALL_DIR/$GO_PIPELINE_NAME"
echo "workspace is $WORKSPACE"
echo 'stop rails server'

#containers=$(docker -H localhost:2375 ps -a -q)
PID=$(ps -eaf | grep rails | grep -v grep | awk '{print $2}')
echo "Pid is $PID"

if [[ $? != 0 ]]; then
    echo "Command failed."
    exit 1
elif [[ $PID ]]; then
    echo "We found a rails pid to kill nice"
    echo "killing $PID"
    kill -9 $PID
else
    echo "No rails pids to kill"
fi
