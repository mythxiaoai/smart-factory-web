#!/bin/bash

# 调用参数如下  start_build.sh "images_name" "dockerFileName" -->$1 $2

CONTAINER_NAME=$1
if [ ! $CONTAINER_NAME ]; then
    echo "contain_name is blank"
    exit;
fi

DOCKER_FILE_NAME=$2
if [ ! DOCKER_FILE_NAME ]; then
    echo "dockerfile is blank"
    exit;
fi

echo "move dist to dockerfile dir"
rm -rf ./dockerfile/dist
cp -r ../dist/ ./dockerfile/dist


echo "step1 delete images and container"

docker-compose -f docker-compose.yml  stop $CONTAINER_NAME
docker-compose -f docker-compose.yml  rm -f $CONTAINER_NAME

imageid=$(docker images | grep "$CONTAINER_NAME" | awk '{print $3}')
if [ "$imageid" != "" ]; then
   docker images | grep "$CONTAINER_NAME" | awk '{print $3}'|xargs docker rmi
   echo "clear images finish"
fi

cd dockerfile
echo "create images"
docker build -t $CONTAINER_NAME -f $DOCKER_FILE_NAME .

cd ..
echo "create container"
docker-compose -f docker-compose.yml  up -d $CONTAINER_NAME
