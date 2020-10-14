#!/usr/bin/env bash
if ss -lnt | grep -q :3000; then
 echo "Another proces is already listening to port 3000"
 exit 1;
fi
jest
kill -15 0