DOCKER_REGISTRY = forge.jefferson.edu:5000
PROJ_NAME = project-name
CONTAINER_TEST_IMAGE = "$(DOCKER_REGISTRY)/$(PROJ_NAME)"

build:
	docker build --pull -t $(CONTAINER_TEST_IMAGE) -f docker/Dockerfile .

tests:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml run --rm api npm run test

run:
	make build
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml up

start-staging:
	@docker pull $(DOCKER_REGISTRY)/$(PROJ_NAME):develop && docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d

start-prod:
	@docker pull $(DOCKER_REGISTRY)/$(PROJ_NAME):master && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Can be used to only restart the API service (most common deployment scenario)
start-prod-api:
	@docker pull $(DOCKER_REGISTRY)/$(PROJ_NAME):master && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate api

migrate:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml run --rm api ./node_modules/.bin/knex migrate:latest

rollback:
	@docker-compose -f docker-compose.yml -f docker-compose.local.yml run --rm api ./node_modules/.bin/knex migrate:rollback

clean:
	@docker-compose down --remove-orphans
