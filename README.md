# ABUIDevKit

This project contains React components which I use in my scenarios and you can do it as well.

## Timepicker
The first component from the pack. It's what can't really find for me.
It supports the input from keyboard, using keyboard arrows Up and Down or by clicking arrows. The value is applied when the cursor is out of the Timepicker block.

## How to use
The files of the component are in Components\Timepicker\
The example, how to execute it, is in the Component 'Planner'

```
  <Timepicker
    onChange={ (data) => {
        setThetime(data)
    }}
    defaultValue='12:00:00' />
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

