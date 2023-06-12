import { prop, Passthrough, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class USER extends TimeStamps{

  @prop({ required: true })
  username: string;

  @prop({ required: true, unique: true, trim: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({
    required: true,
    type: () =>
      new Passthrough(
        [
          {
            groupId: String,
            isAdmin: Boolean,
            level: Number,
            experience: Number,
          },
        ],
        true
      ),
  })
  groups: [
    {
      groupId: string;
      isAdmin: boolean;
      level: number;
      experience: number;
    }
  ];

  @prop({ type: [String], required: true })
  taskId: string[];
}

const UserModel = getModelForClass(USER);

export default UserModel;
