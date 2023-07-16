
const express = require("express");
const app = express();
const tasks = require("./routes/task");
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require("./middleware/not-found")


//middlware
app.use(express.static('./public'))
app.use(express.json());
app.use("/api/v1/tasks", tasks);

app.use(notFound)
const port = 3000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
       console.log(error) 
    }
}

start()