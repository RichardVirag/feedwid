import { MailAdapter, sendMailData } from '../mailAdapter';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fec1f743e4daa2",
      pass: "b594652a60cbf8"
    }
});

export class nodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: sendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Richard Virag <andraderv10@gmail.com>',
            subject,
            html: body
        })
    }
}