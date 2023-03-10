import { inject, injectable } from "tsyringe"
import { deleteFile } from "../../../../utils/file"
import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
    user_id: string
    avatar_file: string
}

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({user_id, avatar_file}: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id)

        if(user.avatar){
            await deleteFile(`./tmp/avatar/${user.avatar}`)
        }

        await this.usersRepository.update(user_id, avatar_file)
    }
}