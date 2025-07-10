package workout

import (
	"encoding/json"
	"net/http"
	"sync"

	"github.com/Scxtto/Hearth/backend/internal/models"
)

// In-memory store with mutex for concurrency safety
var (
	templates []models.WorkoutTemplate
	mtx       sync.Mutex
)

// RegisterRoutes sets up HTTP handlers for workout templates
func RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/workout-templates", workoutTemplatesHandler)
}

// Handles both GET and POST for /api/workout-templates
func workoutTemplatesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getWorkoutTemplates(w, r)
	case http.MethodPost:
		createWorkoutTemplate(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// GET /api/workout-templates
func getWorkoutTemplates(w http.ResponseWriter, r *http.Request) {
	mtx.Lock()
	defer mtx.Unlock()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(templates)
}

// POST /api/workout-templates
func createWorkoutTemplate(w http.ResponseWriter, r *http.Request) {
	mtx.Lock()
	defer mtx.Unlock()
	var tmpl models.WorkoutTemplate
	if err := json.NewDecoder(r.Body).Decode(&tmpl); err != nil {
		http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
		return
	}
	tmpl.ID = len(templates) + 1
	templates = append(templates, tmpl)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(tmpl)
}
