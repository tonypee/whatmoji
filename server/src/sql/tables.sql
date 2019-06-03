-- Drop table
 
DROP TABLE if exists public.users cascade;
DROP TABLE if exists public.groups cascade;
DROP TABLE if exists public.devices cascade;
DROP TABLE if exists public.assoc_users_groups cascade;
DROP TABLE if exists public.assoc_groups_devices cascade;
DROP TABLE if exists public.device_verify cascade;
DROP TABLE if exists public.issues cascade;
DROP TABLE if exists public.issue_events cascade;
DROP TABLE if exists public.humidity_options cascade;
DROP TABLE if exists public.sensors cascade;
DROP TABLE if exists public.sensor_data cascade;
DROP TYPE if exists issue_status cascade;
DROP TYPE if exists sensor_status cascade;

CREATE TYPE issue_status AS ENUM ('issue', 'acknowledged', 'resolved');

CREATE TYPE sensor_status AS ENUM ('normal', 'issue', 'unknown');

set timezone to 'Australia/Melbourne';

CREATE TABLE public.users (
  id serial NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  "role" text NOT NULL,
  password_hash varchar NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_username_key UNIQUE (email)
);

CREATE TABLE public.groups (
  id  SERIAL PRIMARY KEY,
  name varchar NOT NULL
);

CREATE TABLE public.humidity_options (
  key varchar PRIMARY KEY,
  label varchar NOT NULL,
  min double precision NOT NULL,
  max double precision NOT NULL
);

CREATE TABLE public.devices (
  id SERIAL PRIMARY KEY,
  serial varchar NOT NULL,
  name varchar NOT NULL,
  status sensor_status not null,
  last_seen timestamp with time zone NOT null,
  created_at timestamp with time zone NOT NULL
);

CREATE TABLE public.issues (
  id SERIAL PRIMARY KEY,
  device_id int4 NOT NULL references devices(id),
  status issue_status NOT NULL,
  description varchar,
  created_at timestamp  with time zone NOT NULL
);

CREATE TABLE public.issue_events (
  id SERIAL PRIMARY KEY,
  issue_id int4 NOT NULL references issues(id),
  author int4 NULL references users(id),
  description varchar,
  created_at timestamp  with time zone NOT NULL
);

CREATE TABLE public.assoc_users_groups (
    user_id int4 NOT NULL references users(id), 
    group_id int4 NOT NULL references groups(id),
    CONSTRAINT assoc_users_groups_pk PRIMARY KEY (user_id, group_id)
);

CREATE TABLE public.assoc_groups_devices (
  group_id int4 NOT NULL references groups(id),
  device_id int4 NOT NULL references devices(id),
  CONSTRAINT assoc_groups_devices_pk PRIMARY KEY (group_id, device_id)
);

CREATE TABLE public.device_verify (
	updated timestamp with time zone NOT NULL  default CURRENT_TIMESTAMP,
	token varchar NULL,
	id  SERIAL primary key
);

CREATE TABLE public.sensors (
  id SERIAL PRIMARY KEY,
  device_id int4 NOT NULL,
  type varchar NOT NULL, 
  name varchar NOT NULL, 
  status varchar not NULL,
  value jsonb not null,
  created_at timestamp  with time zone NOT NULL default CURRENT_TIMESTAMP
);


-- Enable rs

ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.assoc_users_groups ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.assoc_groups_devices ENABLE ROW LEVEL SECURITY;

-- Policies

DROP POLICY IF EXISTS users_policy on public.users;

DROP POLICY IF EXISTS devices_policy on public.devices;

DROP POLICY IF EXISTS groups_policy on public.groups;

DROP POLICY IF EXISTS users_groups_assoc_policy on public.users_groups_assoc;

DROP POLICY IF EXISTS groups_devices_assoc_policy on public.groups_devices_assoc;

DROP POLICY IF EXISTS sensors_policy on public.groups_sensors;


CREATE POLICY users_policy ON public.users USING (
	(SELECT id = current_setting('jwt.claims.userid')::int4)
);

CREATE POLICY assoc_users_groups_policy ON public.assoc_users_groups USING (
	exists(SELECT 1 from public.users u where u.id = user_id)
);

CREATE POLICY groups_policy ON public.groups USING (
	exists(SELECT 1 from public.assoc_users_groups a where a.group_id = id)
);

CREATE POLICY assoc_groups_devices_policy ON public.assoc_groups_devices USING (
	exists(SELECT 1 from public.groups g where g.id = group_id)
);

CREATE POLICY devices_policy ON public.devices USING (
	exists(SELECT 1 from public.assoc_groups_devices a where a.device_id = id)
);

CREATE POLICY sensors_policy ON public.sensors USING (
	exists(SELECT 1 from public.devices d where d.id = device_id)
);

grant usage on schema public to test;
grant create on schema public to test;

GRANT SELECT ON ALL tables IN SCHEMA public TO test;
GRANT INSERT ON ALL TABLES IN SCHEMA public TO test;
GRANT UPDATE ON ALL TABLES IN SCHEMA public TO test;
GRANT DELETE  ON ALL TABLES IN SCHEMA public TO test;

GRANT SELECT ON ALL sequences IN SCHEMA public TO test;
GRANT USAGE ON ALL sequences IN SCHEMA public TO test;
GRANT UPDATE ON ALL sequences IN SCHEMA public TO test;


INSERT INTO public.humidity_options (key, label, min, max) VALUES
	('wine', 'Wine Fridge', 23, 34), 
	('beer', 'Beer Fridge', 34, 45), 
	('house', 'House Fridge', 67, 98);

-- test data

--SELECT * FROM pg_extension;

--create extension pgcrypto;

-- select current_role

-- INSERT INTO public.users
--   (name, email, phone, "role", password_hash)
--     values ('John Doe', 'test@example.com', '04123424242', 'restricted', crypt('password', gen_salt('md5')));

-- INSERT INTO public.users
--   (name, email, phone, "role", password_hash)
--     VALUES('Anne Frank', 'super@example.com', '04123424242', 'super', crypt('password', gen_salt('md5')));


-- INSERT INTO public.groups
--   (name)
--     VALUES('collingwood'),
--           ('fitzroy'),
--           ('cbd');

  
-- INSERT INTO public.devices
--   (serial, name, status, current_temperature_status, current_humidity_status, last_seen, created_at)
--     VALUES('1234-234-234-2345', 'Wine Fridge 1', 12, 'wine', 'issue', 'normal', 'issue','2019-03-29T00:56:56.431Z', '2019-03-29T00:56:56.431Z'),
--           ('4555-34-222', 'Beer Fridge', 4, 'wine', 'normal', 'normal', 'normal', '2019-02-28T04:33:08.369Z', '2019-03-29T00:56:56.431Z'),
--           ('u84-345-343-2', 'Freezer', 1, 'beer', 'issue', 'issue', 'normal','2019-01-12T04:33:08.369Z', '2019-03-29T00:56:56.431Z');

         
-- INSERT INTO public.assoc_users_groups
--   (user_id, group_id)
--     VALUES(1, 1),
--           (1, 2);

-- INSERT INTO public.assoc_groups_devices
--   (group_id, device_id)
--     VALUES(1, 1),
--           (2, 1),
--           (3, 1),
--           (1, 2),
--           (2, 2),
--           (3, 3);

-- INSERT INTO public.issues
--   (device_id, status, created_at, description)
--     VALUES (1, 'issue', '2019-03-28T04:33:08.369Z', 'the fridge exploded!'),
--            (1, 'issue', '2019-03-28T04:31:08.369Z', 'fridge seems unstable!'),
--            (1, 'resolved', '2019-02-28T04:31:08.369Z', 'no importe'),
--            (1, 'acknowledged', '2018-02-28T04:31:08.369Z', 'es muy bueno'),
--            (2, 'issue', '2019-03-28T04:31:08.369Z', 'fridge seems unstable!');
           

          

          
          
         










