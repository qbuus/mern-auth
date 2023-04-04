import { Schema, InferSchemaType, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

type user = InferSchemaType<typeof userSchema>;

export default model<user>("users", userSchema);
