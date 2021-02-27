## Installation
### Clone repo

``` bash
# clone the repo
$ git clone https://github.com/ashish03399/React-js-ssr-csr-template.git

# go into app's directory
$ cd React-js-ssr-csr-template

# install app's dependencies
$ yarn

# start development
$ yarn start
# open localhost:3000

# start production
$ yarn ssr
# open localhost:3000

```

## Documentation

1. It support CSS(normal css and module css both) at server side rendering
1. It support CSS(normal css and module css both) at client side rendering


##Create a react app without using Create-react-app

### Add Webpack
```bash
$ yarn add webpack webpack-cli --dev
```
### Add webpack.config.file (cient.dev.js)

### Add babel
```bash
$ yarn add  babel-core babel-loader babel-preset-es2015 --dev
$ yarn add babel-plugin-transform-object-rest-spread --dev
```

* `@babel/core` - The core functionality of Babel resided in this, Earlier the name was babel-core now they have changed the name only in package.json, repo is still same
* `babel-loader` - It just load the file in webpack for defined extension
* `@babel/preset-react` - It is set of plugins (which transpile react related stuff to js and to es5 as well)

### Create .babelrc file

# SSR setup
```bash
# install express to handle http request
$ yarn add express
```

### Add webpack.config.file (server.dev.js)
ExtractCssChunks.loader and css-loader to parse styles on server side

#### Create server/index.js and add express
Add webpack-dev-middleware and webpack-hot-middleware to auto bundling and reloading









