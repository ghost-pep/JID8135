#!/bin/bash

IP="127.0.0.1"
PORT="4444"

curl $IP:$PORT/api
echo

echo "===== Testing pdf add ====="
DATA1="filename=./test.pdf"
DATA2="content=@./test.pdf"
ID=`curl -d $DATA1 -d $DATA2 $IP:$PORT/api/policy/pdf | jq -r '.id'`
echo 

echo "===== Testing pdf get ====="
curl $IP:$PORT/api/policy/pdf/$ID
echo

echo "===== Testing pdf get all ====="
curl $IP:$PORT/api/policy/pdf/all
echo

echo "===== Testing pdf delete ====="
curl -X DELETE $IP:$PORT/api/policy/pdf/$ID
echo
