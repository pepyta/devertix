import { relations } from "drizzle-orm";
import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const questions = pgTable("questions", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").unique(),
    answer: boolean("answer"),
    categoryId: uuid("category_id").references(() => categories.id),
});

export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").unique(),
});

export const questionRelations = relations(questions, ({ one }) => ({
    category: one(categories, {
        fields: [questions.categoryId],
        references: [categories.id],
    }),
}));

