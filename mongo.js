const { MongoClient } = require("mongodb");

let mongoClient = null;
const mongoUrl =
  "mongodb+srv://ramakrishna:www.mongodb.com@cluster0.xgykt.mongodb.net/?retryWrites=true&w=majority";

async function connectMongoDB() {

  try 
  {
  mongoClient = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoClient.connect();

  console.log("Connected to MongoDB!");
  }
  catch(Error)
  {
    console.log(Error)
  }

}


async function fetchUser(userSearch) {
  const result = await mongoClient
    .db("hospital")
    .collection("patients")
    .findOne({ name: userSearch });

  if (result) {
    return result;
  }

  return null;
}

module.exports = {
  connectMongoDB,
  fetchUser,
};
