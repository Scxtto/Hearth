import React from "react";
import SetRow from "./SetRow";

export default function ExerciseBlock({ name, sets, onAddSet }) {
  return (
    <div className="exercise-block">
      <div className="exercise-header">
        <span className="exercise-name">{name}</span>
        <span style={{ marginLeft: "auto" }}>🔗 •••</span>
      </div>
      <table className="sets-table">
        <thead>
          <tr>
            <th>Set</th>
            <th>Previous</th>
            <th>kg</th>
            <th>Reps</th>
            <th>✓</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set, i) => (
            <SetRow
              key={i}
              setNum={set.set}
              previous={set.previous}
              kg={set.kg}
              reps={set.reps}
              completed={true}
            />
          ))}
        </tbody>
      </table>
      <button className="add-set-btn" onClick={onAddSet}>
        + Add Set
      </button>
    </div>
  );
}
