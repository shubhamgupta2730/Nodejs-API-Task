const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const userRoutes = require("./routes/userRoute");


const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
dbConnect();

app.use('/api/v1/auth', userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});


