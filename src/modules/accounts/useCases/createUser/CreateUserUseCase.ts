import { inject, injectable } from "tsyringe"
import { hash, genSalt } from "bcrypt"
import { AppError } from "../../../../errors/AppError"

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({name, email, password}: ICreateUserDTO): Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if(userAlreadyExists)
            throw new AppError("User already exists")

        const salt = await genSalt(8)
        const passwordHash = await hash(password, salt)

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash
        })
    }
}