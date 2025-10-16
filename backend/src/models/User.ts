import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
    name:string,
    email:string,
    password:string

}

const userSchema: Schema<IUser> = new Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, 
{
    timestamps: true // opcional: crea createdAt y updatedAt
});

const User : Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;