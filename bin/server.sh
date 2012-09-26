#!/bin/bash
# run this before https://gist.github.com/2630210
./node_modules/buster/bin/buster-server & # fork to a subshell
sleep 6 # takes a while for buster server to start
phantomjs ./node_modules/buster/script/phantom.js &
