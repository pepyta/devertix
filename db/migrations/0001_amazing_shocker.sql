CREATE TABLE IF NOT EXISTS "answers" (
	"session_id" uuid,
	"question_id" uuid,
	"choice" boolean,
	CONSTRAINT "answers_session_id_question_id_pk" PRIMARY KEY("session_id","question_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
