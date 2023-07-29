import { AnswersRepository } from "../repositories/answer-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private AnswersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const Answer = await this.AnswersRepository.findById(answerId);

    if (!Answer) {
      throw new Error("Answer not found.");
    }

    if (authorId !== Answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.AnswersRepository.delete(Answer);

    return {};
  }
}
