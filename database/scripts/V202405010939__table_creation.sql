CREATE TABLE "users" (
    "user_id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "github_id" VARCHAR(255) NOT NULL
);

CREATE TABLE "subjects" (
    "subject_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL
);

CREATE TABLE "attempts" (
    "attempt_id" SERIAL PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "timestamp" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "score" BIGINT NOT NULL,
    "subject_id" BIGINT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("user_id"),
    FOREIGN KEY ("subject_id") REFERENCES "subjects"("subject_id")
);

CREATE TABLE "questions" (
    "question_id" SERIAL PRIMARY KEY,
    "options" TEXT[] NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "subject_id" BIGINT NOT NULL,
    FOREIGN KEY ("subject_id") REFERENCES "subjects"("subject_id")
);
