## Get started

In order to get the project running, follow these steps.

#### Installing node & yarn

First [install node 16](https://nodejs.org/en/download/). If you are on Ubuntu, then version 18 will also work. On Windows you should only go with 16 and `yarn --ignore-engines`
Afterwards, also [install yarn](https://yarnpkg.com/en/docs/install).

#### Installing database

[Install MongoDB 3.6 (Client)](https://www.mongodb.com/docs/v3.6/tutorial/install-mongodb-on-ubuntu)
This version has the most compatibility and functionality included, compared to the later versions

For production environment, we recommend to install [MongoDB 4.4 (Server)](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-ubuntu)
[How to install MongoDB 4.4 on 22.04](https://apmb.co.uk/posts/mongodb-4.4-ubuntu-22-04/)

Install Redis Server version 3 || 4 || 5 || 6
`sudo apt-get install redis-server`
`sudo systemctl enable redis-server.service`

#### Clone project

In your command line, navigate to the directory where you want to clone the project.
In this directory, run

`git clone git@ssh.dev.azure.com:v3/ab-inbev/EUR_SOL_Comm_CryptoTitans/CryptoTitansHomePage ${FOLDERNAME}`

with FOLDERNAME being the folder you want to clone the git project into.

Afterwards, enter the newly created directory.

`cd ${FOLDERNAME}`

In this folder, run the following command:

`yarn`

This will install the necessary development dependencies and every project's specific dependencies.
**WARNING**: this process can take up to 5 minutes, depending on your OS and computer performance. Once you see the message `Done in (xx)s.`, the installation is finished.

#### Running your project

Before running the very first time, make sure to get environment variables file either from other instances of a project or from other developers
Environment variables are located in `settings/.env`, `settings/.env.development` and `settings/.env.production` files

Create folder `/data/cryptotitans` (only the very first time)

Run `mongod -f mongodb_config.yaml` before each start

Run `mongo --port 13666` (only the very first time)
Run `rs.initiate()` (only the very first time)

With everything correctly installed, you should now be able to execute

`npm start`

This command will start the project (both server and client) to have your localhost up and running. This process can take up to around a minute. Once you see the message `webpack built`, all your services should be up and running.

You can test this by visiting http://localhost:${PORT}. If all went well, you should be greeted by the homepage.

## Setting up your editor

If your project is up and running correctly, it's time to set up your Webstorm editor.

Open Webstorm and open the folder where you cloned the project.

#### Mark node_modules as excluded

To prevent Webstorm from scanning all `node_modules` folders for indexing, open all the project folders (api, app, frontend & goldmine), locate the `node_modules` folder, right-click and select `Mark Directory As` -> `Excluded`.

This will turn these folders orange, indicating that Webstorm will no longer index these folder.

#### Setting the correct language

Next, open your Webstorm's Settings dialog and navigate to `Languages & Frameworks` and click `JavaScript`.

Make sure the `JavaScript language version` is set to `React JSX`. Then click `OK`.

#### Linters & inspections

To ensure clean code without errors, we use a widely used Javascript linter: ESlint.

In Webstorm's Settings, navigate to `Languages & Frameworks` - `JavaScript` - `Code Quality Tools`. Make sure that only `ESlint` is enabled.

Again in the Settings dialog, navigate to `Editor` and click `Inspections`. Disable all JavaScript inspections and then re-enable ESlint (`JavaScript` - `Code Quality Tools` - `ESlint`).

Click `OK` to apply your changes.

## Commands

How to develop:
1) `yarn` to install all dependencies, needed for web application
2) `npm start` to run server and client web application in dev mode

How to deploy:
1) `yarn build:server` to make production server bundle
2) `yarn build:client` to make production client bundle
3) Go to `dist` folder, add `./static/*` files, commit and push the bundled project to `master` branch
4) Connect to VM
5) Go to `~/mleb` folder
6) `git pull origin master` to update project
7) `yarn` to install dependencies
8) Go to `~/mleb/dist` folder
9) `git pull origin master` to update bundled project
10) Go back to `~/mleb` folder
11) `yarn prod` to restart project

Nginx placed in `/etc/nginx` folder

## When creating pull request

- Do not ignore eslint warnings and errors
- Do not ignore console warnings
- Check your markup to be solid on any screen resolution from 387px to 1280px

## Code style

- Use aliases for import
- Import React firstly
- Import PropTypes secondly
- Import cx thirdly
- Import third-party npm modules by alphabet
- Import lodash at the end of third-party npm modules, by alphabet
- Import defaults by alphabet, but starting with emptyArr, emptyObj, etc
- Import client/request
- Import svgs and styles and the very end

- Destructure and pass PropTypes by alphabet
- Pass `function` PropTypes at the very end

- In react render if there are multiple children in parent, separate them with line breaks
- If there are more than 3 props passed to react component props, write them at new lines

- Declare object`s properties on new lines

- In css declare `width`, `height`, `margin`, `padding`, `position` firstly, then by alphabet
# titans
