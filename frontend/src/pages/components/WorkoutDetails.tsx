import { Workout } from "../../models/Workout";
import { AiFillDelete } from "react-icons/ai";
import { FormatDate } from "../../DateFormat/DateFormat";

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
      <p>{FormatDate(content.createdAt)}</p>
      <span
        onClick={(e) => {
          onDelete(content);
          e.stopPropagation();
        }}
      >
        <AiFillDelete size={20} />
      </span>
    </div>
  );
};

export default WorkoutDetails;
