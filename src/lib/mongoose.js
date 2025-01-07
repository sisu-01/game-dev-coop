import mongoose from "mongoose";

const connection = {};
// const connection = global.mongoose || { isConnected: 0 };

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
    // global.mongoose = connection; // 글로벌 변수에 연결 상태 저장
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to mongodb');
  }
}