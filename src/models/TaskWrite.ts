import { prop, Passthrough, getModelForClass } from '@typegoose/typegoose';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class TaskWrite extends TimeStamps{

    @prop({ required: true })
    title: string

    @prop({ required: true })
    instruction: string

    @prop({ required: true })
    date: Date

    // @prop()
    // timeMin: number

    @prop({ required: true })
    groupId: string

    @prop()
    lengthMin: number

    @prop()
    points: number

    @prop({
        required: true,
        type: () =>
          new Passthrough(
            [
              {
                  userId: String,
                  taskResponse: String,
              },
            ],
            true
          ),
      })
      responses: [
        {
            userId: string;
            taskResponse: string;
        }
      ];

}

const TaskWriteModel = getModelForClass(TaskWrite);
export default TaskWriteModel;