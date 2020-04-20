# Example Projects

## CDN Example (./example_one)

Shows how to use the SDK provided as a released zip or cdn.

1. Download the SDK from [here](2).
2. Drop the ucsdk.js file into "./example_one".
3. Open "./example_one/index.html" in the browser.

### Relevant Files

- **ucsdk.js**: this is the sdk.
- **main.js**: main file to look at, this contains event listeners and connection method.
- **init.js**: file containing the call controller methods.

Any files not mentioned just contain methods to manipulate the dom.

## React TypeScript Application (./example_two)

### Shows an example of a react application using the npm package ucclient-sdk

### Starting application

First move into the relevant folder to run this example.

```
cd ./example_two
```

All dependencies must be installed before starting application, command show below, this will install the [UCClient-SDK][1].

```
npm install
```

Start the application on a local server with the command below.

```
npm start
```

Application will be started on localhost:8080 you can visit this in your browser.

[1]: https://github.com/mondago/ucclient-js-sdk
[2]: https://github.com/mondago/ucclient-js-sdk/releases/
