// internal/models/workout_template.go
package models

type WorkoutTemplate struct {
    ID        int    `json:"id"`
    Name      string `json:"name"`
    // You can include user_id, etc if needed
    Exercises []WorkoutExerciseTemplate `json:"exercises"`
}

type WorkoutExerciseTemplate struct {
    Name string              `json:"name"`
	ID   int                 `json:"id"`
    Sets []WorkoutSetTemplate `json:"sets"`
}

type WorkoutSetTemplate struct {
    Kg     float64 `json:"kg"`
    Reps   int     `json:"reps"`
    // Add fields as needed
}