import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD
  }
});

export default async function sendRecoveryEmail(email, token) {
  const link = `http://localhost:8080/api/recover/${token}`;

  return await transport.sendMail({
    from: "Lado Positivo <coder@backend.com>",
    to: email,
    subject: "Recuperación de contraseña",
    html: `
      <h1>Restablecé tu contraseña</h1>
      <p>Hacé clic en el botón para cambiar tu contraseña. Este enlace expira en 1 hora.</p>
      <a href="${link}" style="
        display: inline-block;
        padding: 12px 20px;
        background: #222f3c;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      ">Restablecer contraseña</a>
    `
  });
}