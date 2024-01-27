import mongoose from "mongoose"

const mongoConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "ReactBackend" })
    .then(() => console.log(`Database Connected`))
    .catch((e) => console.log(`Error While Database Connection : ${e}`))
}

export default mongoConnection
