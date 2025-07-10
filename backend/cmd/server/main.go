package main

import (
	"log"
	"net/http"

	"github.com/Scxtto/Hearth/backend/internal/api/workout"
)

func withCORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusNoContent)
            return
        }
        next.ServeHTTP(w, r)
    })
}

func main() {
	// Create a new HTTP request multiplexer (router)
	mux := http.NewServeMux()

	// Register your workout template handlers
	workout.RegisterRoutes(mux) // Register the workout template routes
	workout.RegisterWorkoutRoutes(mux) // Register the workout routes for sessions

	// Serve static files from the frontend build directory
	log.Println("Server running at :8080")
	http.ListenAndServe(":8080", withCORS(mux))
}
