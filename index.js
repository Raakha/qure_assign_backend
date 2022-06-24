const express = require("express");
const cors = require("cors");
const app = express();

const { connectMongoDB, fetchUser } = require("./mongo");

const port = 8000;

app.use(cors());

connectMongoDB();

app.get("/search", async (req, res) => {
  const userSearch = req.query.user;
  console.log("Query: ", userSearch);

  if (userSearch.length > 0) {
    const resultObject = await fetchUser(userSearch);

    if (!resultObject) {
      res.status(200).json({
        message: "No user found!",
        status: "not found",
      });
      return
    }

    res.status(200).json({
      status: "success",
      user: resultObject,
    });
  } else {
    res.status(400).json({
      message: "Invalid search query",
      status: "failed",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
