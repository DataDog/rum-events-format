#!/usr/bin/env bash

line='----------------------------------------'

declare -a sample_schema_folders=(
  "rum-schema"
  "session-replay-mobile-schema"
  )

declare -a event_formats_for_samples=(
  "rum-events-format.json"
  "session-replay-mobile-events-format.json"
  )

index = 0
for schema_folder in "${sample_schema_folders[@]}"; do 
  printf "Validating samples in %s with %s" "$schema_folder" "${event_formats_for_samples[index]}"
  printf "\n"
  for sample in samples/$schema_folder/*/*.json; do
    printf "Validating %s %s " "$sample" "${line:${#sample}}"
    result=$(python validate.py "$sample" "${event_formats_for_samples[index]}" 2>&1)
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
  ((index=index+1))
done