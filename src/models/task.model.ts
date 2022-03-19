import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Task {
  @prop({ type: String, lowercase: true, required: true })
  public title: string;

  @prop({ type: String, lowercase: true, required: true })
  public description: string;
}

const TaskModel = getModelForClass(Task);

export default TaskModel;
