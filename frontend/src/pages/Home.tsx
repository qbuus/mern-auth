import { useEffect, useState } from "react";
import { Workout } from "../models/Workout";
import WorkoutDetails from "./components/WorkoutDetails";

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
            <WorkoutDetails
              key={workout._id}
              content={workout}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
