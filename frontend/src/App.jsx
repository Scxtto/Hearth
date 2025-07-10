import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Workout from "./pages/workout/WorkoutHome";
import WorkoutSession from "./pages/workout/WorkoutSession"; 
import Home from "./pages/Home";
// import Recipes from "./pages/Recipes"; // If you have this
// import History from "./pages/History"; // If you have this
window.addEventListener('submit', e => {
  console.trace("Form submitted!", e);
});

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/workout/session" element={<WorkoutSession />} />
          {/*<Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/recipes" element={<Recipes />} /> */}
          {/* <Route path="/history" element={<History />} /> */}
        </Routes>
      </main>
    </Router>
  );
}