import "./Home.css";

export default function Home() {
  return (
    <main className="home-main">
      <div className="home-title">Welcome to Hearth</div>
      <div className="home-widgets">
        <div className="home-widget">[ Recipes Widget ]</div>
        <div className="home-widget">[ Pantry Widget ]</div>
        <div className="home-widget">[ Workouts Widget ]</div>
        <div className="home-widget">[ More Coming Soon ]</div>
      </div>
    </main>
  );
}
