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
    ;;

*)
    echo "usage: docker.sh [build]"
    ;;
esac
