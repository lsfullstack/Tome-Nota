import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import usersRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes";
import categoriesRoutes from "./routes/categories.routes";
import studyTopicsRoutes from "./routes/studyTopics.routes";
import lessonRoutes from "./routes/lessons.routes";
import textRoutes from "./routes/text.routes";
import paragraphsRoutes from "./routes/paragraphs.routes";
import extraContentRoutes from "./routes/extraContent.routes";
import videoRoutes from "./routes/video.routes";

const app = express();

app.use(express.json());
app.use("/users", usersRoutes);
app.use("/login", sessionRoutes);
app.use("/categories", categoriesRoutes);
app.use("/study-topics", studyTopicsRoutes);
app.use("/lesson", lessonRoutes);
app.use("/text", textRoutes);
app.use("/paragraphs", paragraphsRoutes);
app.use("/extra-content", extraContentRoutes);
app.use("/video", videoRoutes);

app.use(handleErrorMiddleware);

export default app;
