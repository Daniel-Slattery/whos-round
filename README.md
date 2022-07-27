<h1 id='Title'>Who's Round</h1>

A React Native app built on the Expo platform. An app that tracks the drinking consumption of a group; keeps track of who's buying the next round and the drinks list.

<h1>Tech Stack</h1>

<div align="center">
  <img alt="typescript logo" width="40px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png" />
  <img alt="react native logo" width="40px" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" />
  <img alt="socket-io logo" width="40px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/800px-Socket-io.svg.png"/>
  <img alt="redux logo" width="45px" src="https://redux.js.org/img/redux.svg"/>
  <img alt="expo logo" height="45px" src="https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s"/>
  <img alt="figma logo" height="40px" src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"/>
</div>

<br>

<div align="center">
  <img alt="app in use" height="400px"  src="client/assets/whos-round-fast.gif"/>
</div>
<br>
<h1>Features</h1>

• Users input their name and drink of choice

• User is then directed to main page where all other users details are displayed

• User presses beer icon when finished their drink to notify participants

• When all users drinking status is finished, the app will notify the buyer of the next round with a list of drinks to buy

<h1>Features in Progress</h1>

• User sign up and authentication

• Database of users

<br>


<h1 id='wireframes'>Wireframes</h1>

![responsive-page](client/assets/wireframes.PNG)

<br>
<h1 id='getting-started'>Getting Started</h1>

These instructions will help you setup a local development instance of the app.

- <h3 id='clone'>Clone repo</h3>

```
git clone https://github.com/Daniel-Slattery/whos-round
cd whos-round
```


- <h3>Install the dependencies</h3>

```
cd client && npm install
cd ../server && npm install
```

- <h3>Run servers</h3>

```
cd server && npm start
```
- Open another terminal tab
```
cd client && npm start
```


- App should now be running on `http://localhost:19006/`
