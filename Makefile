#!make
all: help

help:
	@echo "Available actions:"
	@echo "    build"
	@echo "        Install dependencies, build project, and run migrations."
	@echo "    restart"
	@echo "        Recompiles the project and restart the containers."
	@echo "    down"
	@echo "        Kill the containers."

build:
	docker-compose up -d
	sleep 10
	docker-compose exec dimebot npm run migrations

restart:
	docker-compose down
	make build

down:
	docker-compose down

SHELL = /bin/sh
