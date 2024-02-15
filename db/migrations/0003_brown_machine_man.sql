CREATE TABLE IF NOT EXISTS "session_questions" (
	"session_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	CONSTRAINT "session_questions_session_id_question_id_pk" PRIMARY KEY("session_id","question_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_questions" ADD CONSTRAINT "session_questions_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_questions" ADD CONSTRAINT "session_questions_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
