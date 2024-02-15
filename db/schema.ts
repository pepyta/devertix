import { relations } from "drizzle-orm";
import { boolean, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";

export const questions = pgTable("questions", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").unique().notNull(),
    answer: boolean("answer").notNull(),
    categoryId: uuid("category_id").references(() => categories.id).notNull(),
});

export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").unique().notNull(),
});

export const sessions = pgTable("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
});

export const sessionQuestions = pgTable("session_questions", {
    sessionId: uuid("session_id").references(() => sessions.id).notNull(),
    questionId: uuid("question_id").references(() => questions.id).notNull(),
}, (fields) => ({
    pk: primaryKey({
        columns: [fields.sessionId, fields.questionId],
    }),
}));

export const answers = pgTable("answers", {
    sessionId: uuid("session_id").notNull(),
    questionId: uuid("question_id").notNull(),
    choice: boolean("choice").notNull(),
}, (table) => ({
    pk: primaryKey({
        columns: [table.sessionId, table.questionId],
    }),
}));

export const sessionQuestionRelations = relations(sessionQuestions, ({ one }) => ({
    session: one(sessions, {
        fields: [sessionQuestions.sessionId],
        references: [sessions.id],
    }),
    question: one(questions, {
        fields: [sessionQuestions.questionId],
        references: [questions.id],
    }),
}));

export const questionRelations = relations(questions, ({ one, many }) => ({
    answers: many(answers),
    category: one(categories, {
        fields: [questions.categoryId],
        references: [categories.id],
    }),
}));

export const answerRelations = relations(answers, ({ one }) => ({
    question: one(questions, {
        fields: [answers.questionId],
        references: [questions.id],
    }),
}));
