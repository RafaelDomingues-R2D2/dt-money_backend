import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByNameTransactionUseCase } from "./FindByNameTransactionUseCase"

export class FindByNameTransactionController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { name } = request.params

        const findByNameTransactionUseCase = container.resolve(FindByNameTransactionUseCase)

        const transactions = await findByNameTransactionUseCase.execute(name)

        return response.status(200).json({transactions})
    }
}