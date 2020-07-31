#!/bin/bash
working=(`dirname $0`)
host="localhost"
port="4242"
venv=${2:-.venv}

if [ "$3" = "" ]; then
	force=false
else
	force=true
fi

command_exists() {
    type -t "$1"
}

activate_env() {
	source "$1/bin/activate"
}

deactivate_env() {
	deactivate &> /dev/null
}

help() {
	echo "# Sim Script"
	echo ""
	echo "## Arguments"
	echo "* init: initialize test server"
	echo "* start: start the server and open test page"
	echo "* stop: kill the test server"
	echo ""
	echo "## Argument 2 (default: '.venv')"
	echo "python environment dir"
	echo ""
	echo "## Argument 3 (default: '')"
	echo "force new environment"
	echo ""
	echo "## Requirements"
	echo "Python 3.x"
	echo ""
	exit 1
}

if [ "$1" = "init" ]; then
	deactivate_env

	if [ $force = true ]; then
		rm -rf $venv
	fi

	if [ ! -f $working/$venv ] || [ $force ]; then
		/usr/bin/env python3 -m venv $venv
		activate_env $venv
		pip install -r test/requirements.txt
		deactivate_env
	fi

elif [ "$1" = "start" ]; then
	export FLASK_APP="$working/app.py"
	export FLASK_ENV=development

	activate_env $venv
	python -m flask run --host=$host --port=$port

	# if command_exists "php"; then
	# 	echo $1
	# 	if ! [ -f $working/php.ini ]; then
	# 		cp $working/php.ini.dist $working/php.ini
	# 	fi

	# 	exec php -c $working/php.ini -S $host $working/router.php &> /dev/null &

	# 	url="http://$host/"
	# 	if command_exists "open"; then
	# 		exec open $url
	# 	elif command_exists "start"; then
	# 		exec start $url
	# 	fi
	# else
	# 	help
	# fi
elif [ "$1" = "stop" ]; then
	activate_env
	python -m flask
	# ps -ef | grep $host | grep -v grep | awk '{print $2}' | xargs kill
else
	help
fi
