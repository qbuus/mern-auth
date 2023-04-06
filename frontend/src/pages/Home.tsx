import { useEffect, useState } from "react";
import { Workout } from "../models/Workout";
import WorkoutDetails from "./components/WorkoutDetails";
import WorkoutForm from "./components/WorkoutForm";
import { useSelector } from "react-redux";
import { RootState } from "../context/AuthorizationContext";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const getUrl = () => {
    return "/api/workouts";
  };

  useEffect(() => {
    let subscribed = false;

    const fetchData = async () => {
      try {
        const response = await fetch(getUrl(), {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();

        if (!subscribed) {
          setWorkouts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user !== null) {
      fetchData();
    }

    return () => {
      subscribed = true;
    };
  }, [user]);

  const handleDeleteClick = async (workout: Workout) => {
    if (user === null) {
      return;
    }

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
