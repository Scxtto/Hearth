// /backend/internal/models/workout.go

package models

type Workout struct {
	ID        int               `json:"id"`
	Name      string            `json:"name"`
	Date      string            `json:"date"`
	Time      string            `json:"time"`
	Exercises []WorkoutExercise `json:"exercises"`
}

type WorkoutExercise struct {
	Name string        `json:"name"`
	Sets []WorkoutSet  `json:"sets"`
}

type WorkoutSet struct {
	Set      int    `json:"set"`
	Previous string `json:"previous"`
	Kg       int    `json:"kg"`
	Reps     int    `json:"reps"`
}