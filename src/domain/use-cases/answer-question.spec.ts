import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answer-repository';
import { AnswerQuestionUseCase } from './answer-question';

const fakeAnswersRepository: AnswersRepository = {
    create: async (answer: Answer) => {
        return;
    }
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
        questionId: '1',
        instructorId: '1',
        content: 'Nova resposta'
    })

    expect(answer.content).toEqual('Nova resposta')
})