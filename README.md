# SS23-SmartPillBox


Pillbox
Download NodeJS at https://nodejs.org/en/download.
Navigate to the HTML folder and delete the node_modules folder and run "npm install" to install the modules again.
We found that when changing environments it was easier to install all of the modules again.

To start the program, run "npm run start".

The program can also be made into an executable by using electron forge (https://www.electronforge.io/) and can be compiled for a number of systems.

Server
First navigate to the ServerFile
For demonstration purposes and because we were unable to configure our server in the way that we like. The web app was deployed using waitress and can be called with the function "waitress-serve --call 'app:create_app'"

the storage variables are in appdata/roaming/html/config or home/.config/HTML
and when running npm on the pi you just have to do: rm node_modules && npm install