import { useEffect, useState } from "react";
import { Workout } from "../models/Workout";
import WorkoutDetails from "./components/WorkoutDetails";
import WorkoutForm from "./components/WorkoutForm";

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
      <WorkoutForm />
    </div>
  );
};

export default Home;
