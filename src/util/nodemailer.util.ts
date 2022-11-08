import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/email.interface";
import "dotenv/config";

const sendEmail = async ({
  subject,
  text,
  to,
}: IEmailRequest): Promise<void> => {
  //Fazendo a conexão com o nosso servidor de SMPT
  //Para a conexão funcionar, precisamos puxar o usuário e senha do outlook que foram colocados no .env
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  //Com a conexão feita, usamos o método sendMail
  //O método fará o envio do email de acordo com os parâmetros passados
  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: text,
    })
    .then(() => {
      console.log("Email send with success");
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error sending email, try again later");
    });
};

export { sendEmail };
