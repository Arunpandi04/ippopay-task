git clone https://github.com/Arunpandi04/sample-node.git

# Node Application

cd sample-node 

node version 14

npm install

create Atlas mongodb a account Refer https://account.mongodb.com/account/login

configure database

connect db and copy connection from mongodb use value from DB_URL in .env

go to network Access page edit connection and give anywhere option.

create .evn file in root folder and provide value for env Refer .evn.example file

npm start App Listen on 5000 port

# React Application 

cd sample-node/client

node version 14

npm install

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
