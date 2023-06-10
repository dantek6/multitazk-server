import { prop, Passthrough, getModelForClass } from "@typegoose/typegoose";

class USER {
  @prop({ required: true, unique: true, trim: true })
  id: string;

  @prop({ required: true })
  username: string;

  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  createdAt: Date;

  @prop({ required: true })
  updatedAt: Date;

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

  @prop()
  taskId: string[];
}

const UserModel = getModelForClass(USER);
export default UserModel;
