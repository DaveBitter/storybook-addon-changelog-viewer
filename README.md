# Storybook Addon Changelog Viewer

_Show Changelog files in the Storybook UI_ - made with ❤️ by [Dave Bitter](https://github.com/DaveBitter)

> Storybook v7.0.0 or higher is needed to use this addon

![Storybook UI showing the changelog tab active and displaying a mock changelog](https://www.davebitter.com/img/articles/storybook-addon-changelog-viewer-demo.png)

## Usage

1. Install addon
   ```
   npm install storybook-addon-changelog-viewer --save
   ```
   ```
   yarn add storybook-addon-changelog-viewer --save
   ```
2. Load addon in `.storybook/main.js`
   ```js
   module.exports = {
     // other configuration here
     addons: [
       // other addons here.
       "storybook-addon-changelog-viewer",
     ],
   };
   ```
3. Import changelog file in story and pass it to the `changelog` parameter

   ```js
   import changelog from "./CHANGELOG.md";

   export default {
     title: "Your Component",
     parameters: {
       changelog: changelog,
     },
   };
   ```

4. View changelog in the Storybook UI. There should be a new tab called "Changelog"

## Features

- View changelog files in the Storybook UI
- Render Markdown as HTML
- Automatically generate a navigation with links to all headings with a SemVer string (e.g. "## 1.0.0 - 2022-06-30")

## Motivation

This addon was created to make it easier to view changelog files in the Storybook UI. Since Storybook v7.0.0. the [Storybook Addon Notes
](https://storybook.js.org/addons/@storybook/addon-notes) is no longer working which is why this addon was created.
