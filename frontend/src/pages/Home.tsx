import { useEffect, useState, useRef } from "react";
import { Workout } from "../models/Workout";
import WorkoutDetails from "./components/WorkoutDetails";
import WorkoutForm from "./components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const effectRan = useRef<boolean>(false);

  const getUrl = () => {
    return "/api/workouts";
  };

  useEffect(() => {
    let subscribed = false;

    const fetchData = async () => {
      try {
        const response = await fetch(getUrl());
        const data = await response.json();

        if (!subscribed) {
          setWorkouts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (effectRan.current === false) {
      fetchData();
    }

    return () => {
      subscribed = true;
      effectRan.current = true;
    };
  }, []);

  const handleDeleteClick = async (workout: Workout) => {
    const response = await fetch("api/workouts/" + workout._id, {
      method: "DELETE",
    });

    if (response.ok) {
      setWorkouts(
        workouts.filter(
          (workoutFilter) => workoutFilter._id !== workout._id
        )
      );
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              onDelete={handleDeleteClick}
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
