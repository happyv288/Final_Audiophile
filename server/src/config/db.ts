import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;

// victorhappiness18_db_user
// yDcwyYabf6vyMwz4
// mongodb+srv://victorhappiness18_db_user:yDcwyYabf6vyMwz4@cluster0.qe1btii.mongodb.net/?appName=Cluster0
