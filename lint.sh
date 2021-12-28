#!/usr/bin/env bash

line='----------------------------------------'

for file in `ls *.json && ls */*.json`; do
  printf "Linting %s %s " "$file" "${line:${#file}}"
  result=$(jsonlint "$file" 2>&1)
  status=$?
  if [ $status -ne 0 ]
  then
    echo "❌"
    echo "$result"
    exit $status
  else
    echo "✅"
  fi
done
