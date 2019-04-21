package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/hepuxuan/http-server-template/service/controllers"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/user", controllers.UserHandler)
	http.Handle("/", r)

	var port string
	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	} else {
		port = "8080"
	}
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
