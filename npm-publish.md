# Publish project on npmjs.com

How to create an NPX tool

## Prerequisites

### Project setup

> terminal:

```bash
mkdir project-name
cd project-name
npm init
```

### Create the bin directory

> index.js file: ./bin/index.js

```js
#!/usr/bin/env node

console.log("Hello World");
```

The shebang line below should be added to index.js file.
The shebang is only necessary in the entry point file of your application that is meant to be run directly from the command line. Other modules that are imported don't need the shebang.

The shebang line tells the system that this file should be executed with Node.js. It's especially important if you're developing a CLI (Command Line Interface) application that should be runnable as a command.

```js
#!/usr/bin/env node
```

> package.json file:

```json
"bin": {
    "project-name": "bin/index.js"
},
```

### Test it locally

> terminal:

```bash
npm i -g
npx project-name
```

### Publish the package

This step requires an NPM account, so if you don't have one make sure to [create one](https://www.npmjs.com/signup).

> terminal:

```bash
npm login
```

Then, we will publish the tool.

> terminal:

```bash
npm publish
```

Note: If you're using a GitHub repository for your project make sure to commit everything before running this command.

### Use your published package

> terminal:

```bash
npx package_name
```

### Update your package

> terminal:

```bash
npm version <type>
```

Where `<type>` determines how to increment the version. It can be one of the following values:

1. patch: This will increment the last number in your version and it usually means a small change. For example, it would change the version from 1.0.0 to 1.0.1.
2. minor: This will increment the second number in your version and it usually means a minor change that doesn't necessarily affect how the user uses this tool. For example, it would change the version from 1.0.0 to 1.1.0.
3. major: This will increment the first number in your version it usually means that a big change happened that can affect how this tool is used. For example, it would change the version from 1.0.0 to 2.0.0.

Now, publish the updated package

> terminal:

```bash
npm publish
```
