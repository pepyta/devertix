ALTER TABLE "answers" ALTER COLUMN "session_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "question_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "choice" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "answer" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "category_id" SET NOT NULL;