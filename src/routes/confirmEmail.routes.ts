import { Request, Response, Router } from "express";
import { IEmailRequest } from "../interfaces/email.interface";
import { sendEmail } from "../util/nodemailer.util";

const confirmEmailRoutes = Router();

confirmEmailRoutes.post("", async (req: Request, res: Response) => {
  try {
    const { subject, text, to }: IEmailRequest = req.body;
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

export default confirmEmailRoutes;
