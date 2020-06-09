import json
import sys
import jsonschema
import os

base_path = os.path.abspath(os.path.dirname(__file__))
candidate_path = os.path.join(base_path, sys.argv[1])
schema_path = os.path.join(base_path, sys.argv[2])

with open(schema_path) as file_object:
    schema = json.load(file_object)
with open(candidate_path) as file_object:
    candidate = json.load(file_object)

# allow to validate against sub schema
base_path = os.path.abspath(os.path.dirname(schema_path))

resolver = jsonschema.RefResolver(base_uri='file://' + base_path + '/', referrer=schema)
jsonschema.validate(candidate, schema, resolver=resolver)
