import nodemailer from 'nodemailer';

export const sendEmail = async ({to, type, subject, text, html}:any) => {
    try {
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.auth_user,
                pass: process.env.auth_password
            }
        });

        await transporter.sendMail({
            from: "JobHunt@gmail.com",
            to: to,
            subject,
            text,
            html,
        })
    } catch (error) {
        console.log(error)
        return error;
    }
}