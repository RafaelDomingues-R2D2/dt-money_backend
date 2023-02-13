import { Transaction } from "@prisma/client"
import { inject, injectable } from "tsyringe"
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository"

@injectable()
export class ListTransactionUseCase {
    constructor(
        @inject("TransactionRepository")
        private transactionRepository: ITransactionsRepository
    ){}

    async execute(): Promise<Transaction[]>{
        const transactions = await this.transactionRepository.list()

        return transactions
    }
}