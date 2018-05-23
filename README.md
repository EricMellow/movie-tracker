## Movie Tracker

![Optional text](../master/images/movie-tracker-recent-movies.png)
![Optional text](../master/images/movie-tracker-login-signup.png)


# Movie Tracker

This app is built in React using Redux and Router.  It is connected to a Postgres backend server.  It pulls in current movie data.  It allows a user to sign in and sign out and add their favorite movies.  The data comes from an api.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Clone down this repo https://github.com/turingschool-examples/movie-tracker

Installation:
Head over to Postres.app to download and install PostgreSQL
When you click initialize, you should now be able to see that postgreSQL is running
To be able to use the command line tools, you will need to run the following commannd in your terminal to configure your $PATH 

```
sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp
```

You will need to close your terminal window and re-open it for the changes to take effect.

### Creating our database
Make sure you are in you movie-tracker project folder.
From the command line, run the following command to create a users database:

```
psql -f ./database/users.sql
```

In order to start up the server: 

```
npm install
npm start
```

You should now be able to visit localhost:3000/api/users and see the database with a single user (Taylor).
Press CMD-T to create a new tab in your terminal. Type:

```
psql
```

This will get you into the interactive postgres terminal. From here you can run postgres and sql commands. You might get an error psql: FATAL: database "username" does not exist To resolve this error type createdb 'something does not exist'.

In Google Chrome install the [Moesif Origin & CORS Changer](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc?hl=en
) from the Chrome Web Store.

### Installing

Clone this repo.  https://github.com/mcnamara14/movie-tracker

In the terminal, cd into the folder.

```
npm install
npm start
``` 

## Built With

* [React] - The web framework used
* [Redux] - Library
* [Router] - Library 

## Authors

* **Eric Jungbluth** - *Initial work* - [Eric On GitHub](https://github.com/EricMellow)
* **Tyler McNamara** - *Initial work* - [Tyler On GitHub](https://github.com/mcnamara14)
* **Theresa Marquis** - *Initial work* - [Theresa On GitHub](https://github.com/tmcjunkinmarquis)
