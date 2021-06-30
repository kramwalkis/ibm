const express = require("express");
const cors = require("cors");
const routesHandler = require("./routes/handler.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});


app.use(["/"], routesHandler);