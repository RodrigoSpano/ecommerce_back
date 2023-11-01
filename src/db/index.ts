import mongoose from "mongoose";

mongoose
  .connect(`${process.env.DB_CONN}`)
  .then(() => console.log("db connected"));
