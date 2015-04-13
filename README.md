#Validation Tracker

Monitors rippled logs and parses out validation events from the network nodes

##Installation

- Install [node.js and npm](http://nodejs.org/).
- Install dependencies with `npm install`
- Run `npm run start` on any rippled machines that you want to parse the rippled logs for validations.

## Configuration

All configuration is done via environment variables according to the principles of the [Twelve Factor App](http://12factor.net/)

- RIPPLED_LOG_PATH
- MONGO_HOST
- MONGO_PORT
- MONGO_DATABASE

### Optional

- STATSD_HOST
- STATSD_PORT

## Usage

The core class is `RippledLogMonitor` which tails the rippled logs and parses out
validation events, formatting them as JSON and logging to the console.

To extend the monitor functionality create a subclass of `RippledLogMonitor` and
override the `onValidation(validation)` method.

By default a single subclass is implemented in `monitor.js` which writes each validation
to a MongoDB document database configured via the above environment variables

