import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch question answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  // sut - system under test

  it("should be able be able to fetch question answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") }),
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") }),
    );

    const { answers } = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(answers).toHaveLength(3);
  });

  it("should be able be able to fetch paginated recent question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityId("question-1") }),
      );
    }

    const { answers } = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
