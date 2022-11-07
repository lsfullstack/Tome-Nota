import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().then(() => {
    console.log("Database connected");
  }).catch((error) => {
    console.log(error);
  });

  app.listen(3000, () => {
    console.log("Server running");
  });

})();

