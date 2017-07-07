#!/bin/bash
working=(`dirname $0`)
host="localhost:8675"

command_exists() {
    type "$1" &> /dev/null ;
}

help() {
	echo "# Test Script"
	echo ""
	echo "## Arguments"
	echo "* start: start the server and open test page"
	echo "* stop: kill the test server"
	echo ""
	echo "## Requirements"
	echo "PHP >= 5.x"
	echo ""
	exit 1
}

if [ "$1" = "start" ]; then
	if command_exists "php"; then
		if ! [ -f $working/php.ini ]; then
			cp $working/php.ini.dist $working/php.ini
		fi

		exec php -c $working/php.ini -S $host $working/router.php &> /dev/null &

		url="http://$host/"
		if command_exists "open"; then
			exec open $url
		elif command_exists "start"; then
			exec start $url
		fi
	else
		help
	fi
elif [ "$1" = "stop" ]; then
	ps -ef | grep $host | grep -v grep | awk '{print $2}' | xargs kill
else
	help
fi
