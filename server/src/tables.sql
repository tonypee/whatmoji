-- Drop table
 
DROP TABLE if exists public.users cascade;
DROP TABLE if exists public.names cascade;
DROP TABLE if exists public.votes cascade;

CREATE TABLE public."users" (
  id serial PRIMARY KEY,
  fbid varchar NOT NULL,
  name varchar NOT NULL,
  joined timestamp  with time zone NOT NULL default CURRENT_TIMESTAMP
);

CREATE TABLE public.names (
  id serial PRIMARY KEY,
  emoji varchar NOT NULL,
  name varchar NOT NULL,
  creator int4 NOT NULL --references public.users(id),
--  created date NOT NULL
);

CREATE TABLE public.votes (
  id  SERIAL PRIMARY KEY,
  "user" int4 NOT NULL references public.users(id),
  name int4 NOT NULL references public.names(id)
);