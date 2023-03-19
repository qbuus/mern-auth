import { model, Schema, InferSchemaType } from "mongoose";

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    reps: { type: Number, required: true },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

type workout = InferSchemaType<typeof workoutSchema>;

export default model<workout>("workouts", workoutSchema);
