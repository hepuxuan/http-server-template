FROM golang:1.12.3

# Add Maintainer Info
LABEL maintainer="Puxuan He <puxuanhe@gmail.com>"

# Set the Current Working Directory inside the container
WORKDIR $GOPATH/src/github.com/hepuxuan/hepuxuan/http-server-template/service

# Copy everything from the current directory to the PWD(Present Working Directory) inside the container
COPY . .

# Download all the dependencies
# https://stackoverflow.com/questions/28031603/what-do-three-dots-mean-in-go-command-line-invocations
RUN GIT_TERMINAL_PROMPT=1 go get -d -v ./...

# Install the package
RUN go install -v ./...

# This container exposes port 8080 to the outside world
EXPOSE 8082

# Run the executable
CMD ["service"]