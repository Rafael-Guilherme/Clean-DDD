import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Choose on answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    );
  });

  // sut - system under test

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Comentário teste",
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "Comentário teste",
    );
  });
});
