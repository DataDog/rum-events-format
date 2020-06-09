#!/usr/bin/env bash

line='----------------------------------------'

for sample in samples/*.json; do
  printf "Validating %s %s " "$sample" "${line:${#sample}}"
  result=$(python validate.py "$sample" rum-events-format.json 2>&1)
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
