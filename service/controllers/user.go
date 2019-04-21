package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/hepuxuan/http-server-template/service/models"
)

// UserHandler handle user request
func UserHandler(w http.ResponseWriter, r *http.Request) {
	user := models.Profile{Name: "puxuan"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
