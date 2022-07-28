# rum-events-format

JSON schema of RUM events send by SDKs

# Guidelines

The format must stay backward compatible in order to be able to validate old events, so:

- New fields must not be set as required
- Fields definition must not be updated, new fields must be created instead

Breaking changes to the format must be reflected by a major version update in `_dd.format_version` property.

# Tools

## Generate schema from sample

https://jsonschema.net/

## Validate samples

Prerequisite:

    pip install jsonschema
    
Run a validation:

    ./validate.sh

### Lint JSON files

Prerequisite:

    yarn install

Lint:

    yarn lint
