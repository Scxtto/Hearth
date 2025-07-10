import { useNavigate } from "react-router-dom";

export default function Workouts() {
  const navigate = useNavigate();

  const handleStartWorkout = () => {
    // You can later generate a workout session ID here if needed
    navigate("/workout/session");
  };

  return (
    <main className="workouts-main">
      <h2>Workouts Home</h2>
      <p>This is the Workouts page. Here you'll be able to start, view, and manage your workouts.</p>
      <button className="start-workout-btn" onClick={handleStartWorkout}>
        Start Workout
      </button>
    </main>
  );
}
