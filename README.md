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

CREATE ROLE sfransen WITH
    LOGIN
    SUPERUSER
    INHERIT
    CREATEDB
    CREATEROLE
    NOREPLICATION
    PASSWORD Ladybug

Then I created the Database with

CREATE DATABASE pillbox
    WITH
    OWNER = sfransen
    ENCODING = 'UTF8'
    LC_COLLATE