import React from "react";

export default function SetRow({ setNum, previous, kg, reps, completed }) {
  return (
    <tr>
      <td>{setNum}</td>
      <td className="set-prev">{previous}</td>
      <td>
        <input
          type="number"
          value={kg}
          readOnly
          className="set-input"
        />
      </td>
      <td>
        <input
          type="number"
          value={reps}
          readOnly
          className="set-input"
        />
      </td>
      <td>
        <span className="set-complete">{completed ? "✔" : ""}</span>
      </td>
    </tr>
  );
}
