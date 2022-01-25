# ffc-code-refs-webpack-plugin

This is a webpack plugin for [ffc-code-refs-core](https://github.com/feature-flags-co/ffc-code-refs-core)

## Install

1. Use npm to install the package into your project
  ```
  npm install ffc-code-refs-webpack-plugin --save-dev
  ```

2. Add to the root directory of your project, a file ffcconfig.json with following content:
```json
{
    "envSecret": "",
    "apiUrl": "",
    "excluded": [],
    "fileExtensions": [],
    "numberOfContextLines": 0,
    "exitWithErrorWhenStaleFeatureFlagFound": false,
    "logErrorOnly": true
}
```
- **envSecret**: the secret of your environment, can be found in your SaaS account, **mandatory**
- **apiUrl**: the server url, can be empty if you are using our SaaS platform,  **not mandatory**
- **excluded**: list of excluded file or directory, put the file or directory name only, path is not expected, **not mandatory**
- **fileExtensions**: the file extensions that you want to be scanned, if empty, all files will be scanned, **not mandatory**
- **numberOfContextLines**: the number of lines before and after that will be included into the report, the default value is 0, **not mandatory**
- **exitWithErrorWhenStaleFeatureFlagFound**: if true, will exit with error when any stale feature flag is found, the default value is true, **not mandatory**
- **logErrorOnly**: will print error logs only if true, the default value is false, **not mandatory**

3. In your webpack.config.js file, add following code
  ```
    const { CodeRefsPlugin }  = require('ffc-code-refs-webpack-plugin');
  ```


  ```
    plugins: [
        new CodeRefsPlugin(),
    ],
  ```

## Run

```
npx webpack
```

webpack pipeline would be stopped if any stale feature flags found in the code and a report will be printed to the console.
