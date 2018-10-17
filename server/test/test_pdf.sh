#!/bin/bash

IP="127.0.0.1"
PORT="4444"

curl $IP:$PORT/api
echo

echo "===== Testing pdf add ====="
DATA="title='hi'&content='helloworld'"
ID=`curl -d $DATA $IP:$PORT/api/policy/raw | jq -r '.id'`
echo 

echo "===== Testing pdf get ====="
curl $IP:$PORT/api/policy/raw/$ID
echo

echo "===== Testing pdf get all ====="
curl $IP:$PORT/api/policy/raw/all
echo

echo "===== Testing pdf delete ====="
curl -X DELETE $IP:$PORT/api/policy/raw/$ID
echo
