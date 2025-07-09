package main

import (
	"fmt"
	"net/http"
)

func main() {
    http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hearth backend is running!")
    })

    http.ListenAndServe(":8080", nil)
}