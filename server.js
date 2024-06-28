const express = require('express')
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const userRoutes = require("./routes/userRoute");
const checkAgeRoutes = require('./routes/checkAgeRoute');
const urlRoutes = require('./routes/URLRoute');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(morgan('combined'));
dbConnect();

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1', checkAgeRoutes);
app.use('/api/v1', urlRoutes);
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});


