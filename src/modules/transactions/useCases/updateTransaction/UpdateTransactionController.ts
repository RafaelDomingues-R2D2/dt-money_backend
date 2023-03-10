import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTransationUseCase } from "./UpdateTransactionUseCase";

export class UpdateTransactionController {
    async handle(request: Request, response: Response){
        const { id } = request.params
        const { name, type, category, price } = request.body

        const updateTransactionUseCase = container.resolve(UpdateTransationUseCase)

        const transactions = await updateTransactionUseCase.execute({
            id,
            name,
            type,
            category,
            price
        })
    
        return response.status(201).json({transactions})        
    }
}