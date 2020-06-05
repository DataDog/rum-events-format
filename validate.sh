#!/usr/bin/env bash

set -ex

jsonschema -i samples/action.json rum-events-format.json
jsonschema -i samples/error.json rum-events-format.json
jsonschema -i samples/long_task.json rum-events-format.json
jsonschema -i samples/resource.json rum-events-format.json
jsonschema -i samples/view.json rum-events-format.json
