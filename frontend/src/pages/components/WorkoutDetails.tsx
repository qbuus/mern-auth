import { Workout } from "../../models/Workout";

interface WorkoutType {
  content: Workout;
  onDelete: (content: Workout) => void;
}

const WorkoutDetails = ({ content, onDelete }: WorkoutType) => {
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
      <span
        onClick={(e) => {
          onDelete(content);
          e.stopPropagation();
        }}
      >
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
