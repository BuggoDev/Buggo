# Buggo 

Buggo is a free feedback tracker app that provides a stronger connection between users and developers.

[Here](https://buggo.netlify.app/) is the deployed link.

**Team**

| Name | JHU Email | GitHub Username |
| ---- | --------- | --------------- |
| William Tong | wtong10@jhu.edu | willtong77 |
| Ruoyan (Elva) Shang | rshang3@jhu.edu | Elvaaaaaa |
| Chinat Yu | cyu60@jhu.edu | cyu60 |
| Mark Tiavises | mtiavis1@jhu.edu | mtiavis1 |
| Jiaqi (Jacky) Wang | jwang464@jhu.edu | JiaqiWang18 |
| Karen He | khe8@jhu.edu | khe8 |

**Advisors** 

| Name | JHU Email | GitHub Username |
| ---- | --------- | --------------- |
| Elizabeth Cho | echo30@jhu.edu | Elizabeth-Cho |

## Documentation

* [Project Document](https://docs.google.com/document/d/1ML1Ihv6Dv5gSgwmKBfFmeHLxMMazspGzy3DHzKxehsg/edit#heading=h.gzesfxz2s9)
* [User Manual](https://cs421sp22-homework.github.io/project-team-03-buggo/)
* [API Documentation](https://cs421sp22-homework.github.io/project-team-03-buggo/)

## Installing / Getting started

A quick introduction of the minimal setup you need to get the app up & running on a local computer. For example, your advisor might use the instruction here to run the application locally.

For Frontend
```shell
cd ./code/frontend/buggo
npm init
  press enter until successfully initialized
npm i
npm run start
```

For Backend
```shell
cd ./code/backend
npm i
npm start
```
You will also want to create a .env file with the BUGGO_MONGO_URI (can be found in the project document under secrets) 

Note: for developers, please follow the below instruction to set up a local mongodb database.

## Developing
Developers please follow these detailed instructions to set up your local environment
### Database Setup
We use a local mongodb server for development to ensure local changes won't afftect our production database. Please follow the below instruction for downloading a copy of mongodb on your operating system.

####  Mac OS
Install the Xcode command-line tools by running the following command in your macOS Terminal:
```shell
xcode-select --install
````

Install homebrew if don't have
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
``` 

Download the official Homebrew formula for MongoDB 
```shell
brew tap mongodb/brew
```
Install MongoDB
```shell
brew install mongodb-community@5.0
```

Start MongoDB
```shell
brew services start mongodb/brew/mongodb-community
```

####  Windows
Windows installation is relatively complex, please follow the [guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

### Installation
#### Frontend
```shell
cd ./code/frontend/buggo
npm i
npm start
```

#### Environment Variables
Before running backend, create a `.env` file in backend root folder and use the URI in the secrets portion of the [project document](https://docs.google.com/document/d/1ML1Ihv6Dv5gSgwmKBfFmeHLxMMazspGzy3DHzKxehsg/edit#heading=h.gzesfxz2s9)
Your .env should have BUGGO_MONGO_URI = (secret URI).

#### Backend
```shell
cd ./code/backend
npm i
npm start
```


### Testing Backend
Please write tests for route handlers as well as for  service and repository layer if needed.

We use an in-memory mongodb server for testing that is already preconfigured for each test run. For details please check `backend/src/test/setup.ts`

We have Github Actions scripts that run all the test cases automatically on push and merge. 

### Testing Frontend
For frotend, tests can be written for RTK slices or components. For details, please check the [documentation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) for React Testing Library.

### Deployment
#### Frontend
Frontend should be automatically deployed to Netlify on merge to `main` branch.

#### Backend
Backend is automatically deployed to Heroku via Github Actions workflow on merge to `main` branch.  
