import React, { useState } from "react";
import ExerciseBlock from "../../components/workout/ExerciseBlock";
import { saveWorkoutSession, fetchWorkouts } from "../../services/workouts";
import "./WorkoutSession.css";

const DUMMY_DATA = [
  {
    name: "Shoulder Press (Machine)",
    sets: [
      { set: 1, previous: "25 kg x 18", kg: 25, reps: 18 },
      { set: 2, previous: "45 kg x 11", kg: 45, reps: 11 },
      { set: 3, previous: "50 kg x 6", kg: 50, reps: 6 },
    ],
  },
  {
    name: "Reverse Fly (Cable)",
    sets: [{ set: 1, previous: "50 kg x 20", kg: 50, reps: 20 }],
  },
];

export default function WorkoutSession() {
  const [exercises, setExercises] = useState(DUMMY_DATA);
  const [sessionId, setSessionId] = useState("session-12345");
  const [sessionDate, setSessionDate] = useState("10 Jul 2025");
  const [sessionTime, setSessionTime] = useState("1:01:27");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const handleAddSet = (exIdx) => {
    setExercises((exs) =>
      exs.map((ex, idx) =>
        idx === exIdx
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                {
                  set: ex.sets.length + 1,
                  previous: "",
                  kg: "",
                  reps: "",
                },
              ],
            }
          : ex
      )
    );
  };

  const handleFinish = async () => {
    setSaving(true);
    setError("");
    try {
      const sessionData = {
        name: "Legs",
        date: sessionDate,
        time: sessionTime,
        exercises,
      };
      await saveWorkoutSession(sessionData);
        console.log("Workout session saved successfully");
      setSaved(true);
      // Optionally refresh list of all sessions
      setWorkouts(await fetchWorkouts());
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  return (
    <div className="session-wrapper">
      <div className="session-header">
        <div>
          <div className="session-title">
            Legs <span className="session-dotdotdot">•••</span>
          </div>
          <div className="session-subinfo">
            <span role="img" aria-label="calendar">S
              📅
            </span>{" "}
            {sessionDate}
            <span style={{ marginLeft: "16px" }} role="img" aria-label="clock">
              ⏰
            </span>{" "}
            {sessionTime}
          </div>
        </div>
        <button className="session-finish-btn" onClick={handleFinish} disabled={saving}>
          {saving ? "Saving..." : "Finish"}
        </button>
      </div>
      <div className="session-content">
        {exercises.map((exercise, idx) => (
          <ExerciseBlock
            key={exercise.name}
            name={exercise.name}
            sets={exercise.sets}
            onAddSet={() => handleAddSet(idx)}
          />
        ))}
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {saved && <div style={{ color: "green" }}>Workout Saved!</div>}

      {/* Optional: List all workouts after save */}
      <div>
        {workouts.length > 0 && (
          <>
            <h3>Saved Workouts:</h3>
            <ul>
              {workouts.map((w, i) => (
                <li key={i}>{w.name} — {w.date}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
