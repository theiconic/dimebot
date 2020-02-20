#!/bin/bash

BASEDIR=$(dirname "$0")

node ${BASEDIR}/init-db.js
npm run migrations
