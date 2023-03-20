import { Workout } from "../../models/Workout";

interface WorkoutType {
  content: Workout;
}

const WorkoutDetails = ({ content }: WorkoutType) => {
  return (
    <div className="workout-details">
      <h4>{content.title}</h4>
      <p>
        <strong>Load kg: </strong>
        {content.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {content.reps}
      </p>
      <p>{content.createdAt.toString()}</p>
    </div>
  );
};

export default WorkoutDetails;
