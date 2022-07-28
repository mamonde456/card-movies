import "dotenv/config";
import "./db";
import "../models/Movie";
import "../models/User";
import app from "./server";

const PORT = process.env.PORT || 5000;

// app.use("/", express.static(path.join(__dirname, "../client/build")));

// app.get("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "../client/build/index.html"))
// );

app.listen(PORT, () =>
  console.log(`server to listening http://localhost:${PORT}`)
);
