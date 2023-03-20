import { useEffect, useState } from "react";
import { Workout } from "../models/Workout";

const Home = () => {
  const [workouts, setWorkouts] = useState<Workout[] | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/workouts");
        const data = await response.json();

        if (response.ok) {
          setWorkouts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <p key={workout._id}>{workout.title}</p>
          ))}
      </div>
    </div>
  );
};

export default Home;
