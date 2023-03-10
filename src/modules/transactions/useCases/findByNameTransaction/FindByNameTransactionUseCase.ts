import { Transaction } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";

@injectable()
export class FindByNameTransactionUseCase {
    constructor(
        @inject("TransactionRepository")
        private transactionRepository: ITransactionsRepository
    ){}

    async execute(name: string): Promise<Transaction>{
        const transaction = await this.transactionRepository.findByName(name)

        return transaction
    }

}