set
  client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."letters" (
	"letterId" serial NOT NULL,
	"letter" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"audioUrl" TEXT NOT NULL,
	CONSTRAINT "letters_pk" PRIMARY KEY ("letterId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."colors" (
	"colorId" serial NOT NULL,
	"color" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
	"audioUrl" TEXT NOT NULL,
	CONSTRAINT "colors_pk" PRIMARY KEY ("colorId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."numbers" (
	"numberId" serial NOT NULL,
	"number" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"audioUrl" TEXT NOT NULL,
	CONSTRAINT "numbers_pk" PRIMARY KEY ("numberId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."words" (
	"letterId" serial NOT NULL,
	"word" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"audioUrl" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);






ALTER TABLE "words" ADD CONSTRAINT "words_fk0" FOREIGN KEY ("letterId") REFERENCES "letters"("letterId");
