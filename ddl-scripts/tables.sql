CREATE TABLE public."Users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

CREATE TABLE public."Books" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    "averageScore" VARCHAR(128)
);

CREATE TABLE public."Reviews" (
    id SERIAL PRIMARY KEY,
    "bookId" INTEGER NOT NULL REFERENCES public."Books" (id) ON DELETE CASCADE,
    "userId" INTEGER NOT NULL REFERENCES public."Users" (id) ON DELETE CASCADE,
    score INTEGER,
    status VARCHAR(10) NOT NULL DEFAULT 'borrowed'
);