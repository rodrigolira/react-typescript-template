# react-typescript-template

Personal template for web apps using React and Typescript. Optionally, it can also scaffold the project with TailwindCss configured.

## Creating a project

You can create a project using `npx` and `degit`.

    npx degit rodrigolira/react-typescript-template my-react-app
    cd my-react-app
    git init
    npm install

Optionally, if you want to use TailwindCss in your project, run this command instead:

    npx degit rodrigolira/react-typescript-template#with-tailwindcss my-react-app
    cd my-react-app
    git init
    npm install

## Features

* Webpack 5
	* webpack-dev-server
	* react-refresh
	* Css and Scss support
	* PostCss
	* Image assets (`*.png`, `*.jpg`, `*.jpeg`, `*.gif` and `*.svg`)
* Babel 7
* React
* Typescript
* TailwindCss (optional)
* ESLint (configured with AirBnb's style)
* Prettier
* Stylelint
