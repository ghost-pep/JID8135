#!/bin/bash
cd server;
echo "[*] starting node server"
npm install;
node server.js &
echo "[*] node server started"
cd ..

cd gt-athletics;
echo "[*] starting angular server"
npm install;
ng serve &
echo "[*] angular server started"
cd ..;
