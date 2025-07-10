const API_BASE_URL = "http://localhost:8080/api"; // will be http://localhost:8080/api

export async function saveWorkoutSession(session) {
    console.log("Saving workout session:", session);
    console.log("API Base URL:", API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(session),
  });
  if (!res.ok) throw new Error("Failed to save workout");
  return await res.json();
}

export async function fetchWorkouts() {
  const res = await fetch(`${API_BASE_URL}/workouts`);
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return await res.json();
}