import "reflect-metadata";
import express, { Request, Response } from "express";
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
import timelineRoutes from "./routes/timeline.routes";
import { IEmailRequest } from "./interfaces/email.interface";
import { sendEmail } from "./util/nodemailer.util";

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
app.use("/timeline", timelineRoutes);

app.use(handleErrorMiddleware);

app.post("/email", async (req: Request, res: Response) => {
  try {
    //Aqui pegamos o assunto, texto e o email do destinatário vindos do body da requisição
    //subject -> assunto Cadastro Tome Nota
    //text -> texto Seu cadastro no Tome Nota foi realizado com sucesso!
    //email -> email do destinatário

    const { subject, text, to }: IEmailRequest = req.body;

    //Chamamos a função que fará o envio do email, passando os dados recebidos
    await sendEmail({ subject, text, to });
    return res.json({
      message: "Email sended with success!",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
});

export default app;
