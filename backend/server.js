import mongoConnection from "./data/mongoose.js"
import { app } from "./app.js"

mongoConnection()

app.listen(process.env.PORT, () => {
  console.log(`Server is Working On : `)
  console.log(`http://localhost:${process.env.PORT}`)
})
