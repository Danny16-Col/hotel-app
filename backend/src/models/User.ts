import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    reserved:boolean
    matchPassword(enteredPassword: string): Promise<boolean>;
    

}

const userSchema: Schema<IUser> = new Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reserved: { type: Boolean, default: false },
}, 
{
    timestamps: true // opcional: crea createdAt y updatedAt
});

//Encrypt 
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User : Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;