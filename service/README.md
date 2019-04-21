# install dependencies

`go get ./...`

# run service

`./start-service.sh`

# compile

`go install`

`go build`

# docker

`docker build -t puxuan-http-proxy .`

`docker run -p 8080:8080 puxuan-http-proxy`
