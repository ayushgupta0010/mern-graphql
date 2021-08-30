const express = require("express");
const expressGraphql = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const schema = require("./schema");
const cors = require("cors");

const app = express();

mongoose.connect(
  "mongodb+srv://ayush:gupta@cluster0.50myd.mongodb.net/mydb?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => console.log("connected to db"));

app.use(cors());

app.use("/graphql", expressGraphql({ schema, graphiql: true }));

app.listen(4000, () => console.log("Server running..."));
