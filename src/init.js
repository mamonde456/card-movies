import "dotenv/config";
import "./db";
import "./models/Movie";
import "./models/User";
import "./models/Comment";
import app from "./server";

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>
//   console.log(`server to listening http://localhost:${PORT}`)
// );
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
