import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateTransactionUseCase } from "./CreateTransactionUseCase"

export class CreateTransactionController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { name, type, category, price } = request.body

        const createTransactionUseCase = container.resolve(CreateTransactionUseCase)

        const transactions = await createTransactionUseCase.execute({
            name,
            type,
            category,
            price
        })

        return response.status(201).json({transactions})
    }
}