# JID8135 - Georgia Tech Athletics Association Policy Website


## Installation Instructions
### System Prerequisites
This website needs to run two services: an AngularJS service and an ExpressJS REST API. Both rely on NodeJS so first install it on your server using your system's package manager: 

[NodeJS Package Manager Install](https://nodejs.org/en/download/package-manager/)

If you do not have one of the supported package managers, you can still download it manually: 

[NodeJS Manual Install](https://nodejs.org/en/download/)

You will also need git to download the code that is hosted in this repository:

[Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Getting the code
Now that you have Git, you can install the code and enter the main directory by doing the following: 

`git clone https://github.com/ghost-pep/JID8135.git JID8135 && cd JID8135`

### Dependencies and Running

#### Express Server
Now that you have NodeJS, you can use it to automatically install all of the dependencies. For the Express server, you will first change into its directory and then use Node's package manager, npm, to install its dependencies. Then, you simply use node on the server's code to start it.

```
cd server
npm install
node server.js
cd ..
```

#### Angular Server
For the Angular Server, you need to install its dependencies in the same manner as the Express server. Running the server is also the same as the Express server.

```
cd gt-athletics
npm install
node app.js
```
