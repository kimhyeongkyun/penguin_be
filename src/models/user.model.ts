import * as mongoose from 'mongoose';

interface User {
    name: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;

