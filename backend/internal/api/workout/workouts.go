package workout

import (
	"encoding/json"
	"net/http"
	"sync"

	"github.com/Scxtto/Hearth/backend/internal/models"
)

// In-memory store for MVP
var (
	workouts []models.Workout
	wMtx     sync.Mutex
)

// RegisterWorkoutRoutes sets up HTTP handlers for workouts
func RegisterWorkoutRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/workouts", workoutsHandler)
}

// Handles GET/POST for /api/workouts
func workoutsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getWorkouts(w, r)
	case http.MethodPost:
		createWorkout(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// GET /api/workouts
func getWorkouts(w http.ResponseWriter, r *http.Request) {
	wMtx.Lock()
	defer wMtx.Unlock()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(workouts)
}

// POST /api/workouts
func createWorkout(w http.ResponseWriter, r *http.Request) {
	wMtx.Lock()
	defer wMtx.Unlock()
	var session models.Workout
	if err := json.NewDecoder(r.Body).Decode(&session); err != nil {
		http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
		return
	}
	session.ID = len(workouts) + 1 // Basic ID for now
	workouts = append(workouts, session)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(session)
}
