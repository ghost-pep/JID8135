# JID8135 - Georgia Tech Athletics Association Policy Website


## Installation Instructions
### System Prerequisites
This website needs to run two services: an AngularJS service and an ExpressJS REST API. Both rely on NodeJS so first install it on your server using your system's package manager: 

[NodeJS Package Manager Install](https://nodejs.org/en/download/package-manager/)

If you do not have one of the supported package managers, you can still download it manually: 

[NodeJS Manual Install](https://nodejs.org/en/download/)

You will also need git to download the code that is hosted in this repository:

[Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

The installation process is designed with a unix style shell in mind, so for Windows deployment be sure to install Git Bash (included in the Windows install of Git) in order to run the installation commands that follow.

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
## Release Notes
### New Features
#### Website
* Home page that greets the users and provides links that takes them to specific, featured policies.
* Table of contents that allows users to see the policies and select a policy to view.
* Editor that allows users to make changes to a policy they are viewing. This includes functionality that allows them to format their text with rich text.
* Upload button that allows users to upload a policy that is stored on their system.
* Search modal that provides a dynamic search bar to allow users to filter and choose a policy to edit.
* Contact page that provides information about how to contact administrators associated with the athletics department policy website. The page also provides links that bring a user to their email client ready to draft an email to the selected administrator.
* Angular service that dynamically handles pulling data from the backend and updating the website's internal data structures that track the user's working data set. This is how the page can load data without a loading screen because it is asynchronous and communicates with most of the functionality of the user interface.

#### Backend Services
* Cloud hosted database that provides global access to the information and policies accumulated over the use of the website.
* REST API that provides secure access to the data stored in the database. This allows clients to communicate with the HTTP standard rather than making obscure database transactions manually.
* PDF conversion done in the backend. This allows users to write text and later have it display as a PDF or to upload a PDF and then later edit the policy as text in the frontend's editor.

### Bug Fixes
Because this is the first release of this product, there are no bug fixes.

### Known Bugs and Defects
* Uploading unnecessarily large files has undefined behavior due to the nature of the backend. This bug is due to the cloud database solution used and could be fixed by the provider, Mongo Atlas, in the future.
