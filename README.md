# rum-events-format

JSON schema of RUM events send by SDKs

# Guidelines

The format must stay backward compatible in order to be able to validate old events, so:

- New fields must not be set as required
- Fields definition must not be updated, new fields must be created instead

Breaking changes to the format must be reflected by a major version update in `_dd.format_version` property.

After editing any schema, you must re-generate the JS + TS definitions ([see below](#build-js-sources--ts-definitions)).

## How this repository is consumed?

This repository accommodates various usages, specifically:

- The [Browser SDK](https://github.com/DataDog/browser-sdk/):

  - Generates TypeScript types from `schemas/rum-events-browser-schema.json`,
    `schemas/telemetry-events-schema.json` and `schemas/session-replay-browser-schema.json`.

  - Validates data within unit and e2e tests against `schemas/rum-events-schema.json`.

- The [iOS SDK](https://github.com/DataDog/dd-sdk-ios/) generates native data models based on
  `schemas/rum-events-mobile-schema.json` and `schemas/session-replay-mobile-schema.json`.

- The [Android SDK](https://github.com/DataDog/dd-sdk-android/) generates native data models based on
  schemas coming from `rum/`, `session-replay/` and `telemetry/` folders.

- The Datadog App is using TypeScript types by including the `lib/` folder as a package dependency.

# Tools

## Prerequisite: install dependencies

    yarn

## Validate samples

    yarn validate

## Build JS sources + TS definitions

    yarn build

## Generate TS definitions out of the schemas

    yarn generate

## Prettify TS & JSON files

    yarn format -w

## External tools

### Generate schema from sample

https://jsonschema.net/
