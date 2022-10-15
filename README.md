# Instructions

## Development:

```
docker-compose -f docker-compose.dev.yml up --build --remove-orphans
```

## Production:

```
docker-compose -f docker-compose.prod.yml up --build --remove-orphans
```

## Both Dev and Prod:

```
docker-compose -f docker-compose.all.yml up --build --remove-orphans
```

`--remove-orphans` is used if you have ran the all yml file and have both the containers initialized but only using one at the moment
`--build` is used to force rebuilding of the image and not take images from the cache (if using only dev you can skip the flag)

Prune volumes

```
docker volume prune -f
```

Delete image

```
docker image rm -f react-todo-app
```

Destroy container/network

```
docker-compose -f docker-compose.[VARIANT = dev|prod|all].yml down
```

## NPM scripts for ease of use

```
"docker-dev--build": "docker-compose -f docker-compose.dev.yml up --build --remove-orphans"
---
"docker-dev": "docker-compose -f docker-compose.dev.yml up"
---
"docker-prod": "docker-compose -f docker-compose.prod.yml up --build --remove-orphans"
---
"docker-all": "docker-compose -f docker-compose.all.yml up --build --remove-orphans"
```
