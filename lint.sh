#!/usr/bin/env bash
shopt -s globstar

line='----------------------------------------'

for file in **/*.json; do
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
