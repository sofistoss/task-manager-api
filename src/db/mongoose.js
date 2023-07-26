const { mongoose } = require("mongoose");

//to prepare for deprecation
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URL);
