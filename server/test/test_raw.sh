#!/bin/bash

IP="127.0.0.1"
PORT="4444"

curl $IP:$PORT/api
echo

echo "===== Testing raw add ====="
DATA="title='hi'&content='helloworld'"
ID=`curl -d $DATA $IP:$PORT/api/policy | jq -r '.id'`
echo 

echo "===== Testing raw get ====="
curl $IP:$PORT/api/policy/$ID
echo

echo "===== Testing raw get all ====="
curl $IP:$PORT/api/policy
echo

echo "===== Testing raw delete ====="
curl -X DELETE $IP:$PORT/api/policy/$ID
echo
