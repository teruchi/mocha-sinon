#
# Dockerfile
#
REPO="teruchi/mocha-sinon"
TAG="latest"
DOCKERFILE="Dockerfile"
SERVICE_NAME="mocha-sinon"


case "$1" in
"build" )
    docker build \
      -t ${REPO}:${TAG} \
      -f ${DOCKERFILE} \
      .
    exit
    ;;

"mocha" )
    docker run \
      --rm \
      --name ${SERVICE_NAME} \
      -v "$(pwd)"/opt:/opt \
      ${REPO}:${TAG} \
      mocha
    exit
    ;;

*)
    echo "usage: docker.sh [build|mocha]"
    ;;
esac
