#Validation Tracker

Monitors rippled logs and parses out validation events from the network nodes

## Installation

- Install [node.js and npm](http://nodejs.org/).

````
npm install -g validation-tracker
````

## Configuration

All configuration is done via environment variables according to the principles of the [Twelve Factor App](http://12factor.net/)

In addition to the database-specific environment variables the following must be set:

- RIPPLED_LOG_PATH

## Usage

The validation tracker may log new validations to one or more database systems:

### Stdout
````
validation-tracker --stdout
````

### Postgres
````
export VALIDATION_TRACKER_POSTGRES_URL=postgres://user:pass@127.0.0.1:5432/db_name

validation-tracker --postgres
````

### HBase
````
export HBASE_HOST=127.0.0.1
export HBASE_PORT=12345
export HBASE_TABLE=ledger_validations

validation-tracker --hbase
````

### Graphite
````
export STATSD_HOST=127.0.0.1
export STATSD_PORT=6789

validation-tracker --graphite
````

### All the datastores!

````
validation-tracker --graphite --stdout --hbase --postgres
````

To see all available options run `validation-tracker --help`

## Description

The core class is `RippledLogMonitor` which tails the rippled logs and parses out
validation events, formatting them as JSON and logging to the console.

To extend the monitor functionality create a subclass of `RippledLogMonitor` and
override the `onValidation(validation)` method.

By default `validation-tracker` will exit without a database option specified

## Development

In development you must run `gulp` to create a build
