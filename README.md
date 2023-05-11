# SS23-SmartPillBox


Pillbox
Download NodeJS at https://nodejs.org/en/download.
Navigate to the HTML folder and delete the node_modules folder and run "npm install" to install the modules again.
We found that when changing environments it was easier to install all of the modules again.

To start the program, run "npm run start".

The program can also be made into an executable by using electron forge (https://www.electronforge.io/) and can be compiled for a number of systems.

Server
First navigate to the ServerFile and run .venv\Scripts\activate to enter the virtual environment
For demonstration purposes and because we were unable to configure our server in the way that we like. The web app was deployed using waitress and can be called with the function "waitress-serve --call 'app:create_app'"

the storage variables are in appdata/roaming/html/config or home/.config/HTML
and when running npm on the pi you just have to do: rm node_modules && npm install

Database
Download PSQL from https://www.postgresql.org/download/ and make sure to Download PGAgent and PGBouncer from the stack builder
Next download pgAdmin at https://www.pgadmin.org/download/ this will let us manage the database.

Here you can create a new databse on the postgresql server that was just created. First I suggest creating a new user role that can access and edit the database.

For the included code I used the following SQL script
```
CREATE ROLE sfransen WITH
    LOGIN
    SUPERUSER
    INHERIT
    CREATEDB
    CREATEROLE
    NOREPLICATION
    PASSWORD Ladybug
```
Then I created the Database with:
```
CREATE DATABASE pillbox
    WITH
    OWNER = sfransen
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
GRANT TEMPORARY, CONNECT ON DATABASE pillbox TO PUBLIC;
GRANT ALL ON DATABASE pillbox TO sfransen;
```
Finally I created the tables with:
```
CREATE TABLE IF NOT EXISTS public.logins
(
    id bigint NOT NULL DEFAULT 'nextval('logins_id_seq'::regclass)',
    fname character varying(200) COLLATE pg_catalog."default" NOT NULL,
    lname character varying(200) COLLATE pg_catalog."default" NOT NULL,
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    password character varying(200) COLLATE pg_catalog."default" NOT NULL,
    mtime time without time zone NOT NULL,
    mdtime time without time zone NOT NULL,
    etime time without time zone NOT NULL,
    CONSTRAINT logins_pkey PRIMARY KEY (id),
    CONSTRAINT logins_email_key UNIQUE (email)
)

TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.logins
    OWNER to sfransen;
```
```
CREATE TABLE IF NOT EXISTS public.medications
(
    id bigint NOT NULL DEFAULT 'nextval('medications_id_seq'::regclass)',
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    quantity bigint NOT NULL DEFAULT 'nextval('medications_quantity_seq'::regclass)',
    time_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    days text[] COLLATE pg_catalog."default" NOT NULL,
    username character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT medications_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.medications
    OWNER to sfransen;
```
```
CREATE TABLE IF NOT EXISTS public.photos
(
    id bigint NOT NULL DEFAULT 'nextval('photos_id_seq'::regclass)',
    data bytea NOT NULL,
    "time" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    username character varying(200) COLLATE pg_catalog."default" NOT NULL,
    dayofweek character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT photos_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.photos
    OWNER to sfransen;
```