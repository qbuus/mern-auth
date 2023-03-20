import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState<string>("");
  const [load, setLoad] = useState<number | string>("");
  const [reps, setReps] = useState<number | string>("");
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setReps("");
      setLoad("");
      setTitle("");
      setError(null);
      console.log(json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>Exercise Title</label>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        value={title}
        required
      />

      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLoad(e.target.value)
        }
        value={load}
        required
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setReps(e.target.value)
        }
        value={reps}
        required
      />

      <button type="submit">Create a workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
