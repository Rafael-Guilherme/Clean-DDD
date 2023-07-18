import { randomUUID } from "node:crypto";

interface AnswerProps {
    content: string;
    authorId: string; 
    questionId: string;
}

export class Answer {
    public content: string;
    public id: string;
    public authorID: string;
    public questionID: string;

    constructor(props: AnswerProps, id?: string) {
        this.content = props.content;
        this.authorID = props.authorId;
        this.questionID = props.questionId;
        this.id = id ?? randomUUID();
    }
}