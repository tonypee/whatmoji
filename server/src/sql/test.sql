 
--SET my.username = 'tomas'

--select current_setting('jwt.claims.id')

-- set jwt.claims.userid = 1

--SELECT current_setting('jwt.claims.test')


CREATE ROLE test;

grant usage on schema public to test;

grant create on schema public to test;

grant all privileges on all sequences in schema public to test



select * from public.debug_logs


-- set role test;


-- set role postgres;



--create role test


select * from users


--  select current_role;

-- set role test;

-- set role postgres;



-- select * from pg_policies
 
--functions

-- create function "test"()
-- returns setof device as $$
--   select *
--   from devices
--   where id < 2;
-- $$ language sql stable;


-- set var.test = 123

-- select current_setting('var.test')


-- SELECT grantee
--      ,table_catalog
--      ,table_schema
--      ,table_name
--      ,string_agg(privilege_type, ', ' ORDER BY privilege_type) AS privileges
-- FROM information_schema.role_table_grants
-- WHERE grantee != 'postgres'
--  and table_catalog = 'somedatabase' /* uncomment line to filter database */
--  and table_schema  = 'someschema'   /* uncomment line to filter schema  */
--  and table_name    = 'sometable'    /* uncomment line to filter table  */
-- GROUP BY 1, 2, 3, 4;




