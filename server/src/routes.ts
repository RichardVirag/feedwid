import { nodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbackRepository';
import { SubmitFeedbackUsecase } from './useCases/submitFeedbackUsecase';
import express from 'express'
import nodemailer from 'nodemailer'

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fec1f743e4daa2",
      pass: "b594652a60cbf8"
    }
});

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemmailerMailAdapter = new nodemailerMailAdapter()

    const submitFeedbackUsecase = new SubmitFeedbackUsecase(
        prismaFeedbacksRepository,
        nodemmailerMailAdapter
        )

    await submitFeedbackUsecase.execute({
        type,
        comment,
        screenshot
    })
    
    return res.status(201).send()
})