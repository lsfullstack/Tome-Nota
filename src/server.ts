import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });

  const port = 2023;

  app.listen(process.env.PORT || port, () => {
    console.log(`Server running in port ${port}`);
  });
})();
