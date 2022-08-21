## Environics Map Test

This project demonstrates a webmap developed using the ESRI ArcGIS API for Javascript V4.24.7. Spatial data used in this demo is provided by the [Open Data Portal](https://data.mississauga.ca/) for the City of the Mississauga.

This project is built using React.js with Typescript.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the Project

We assume that [Node.js](https://nodejs.org/en/) with [npm](https://www.npmjs.com/) is already installed.

In the project directory, you should run:

### `npm install`

Installs all dependencies and required node modules

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Known Issues

- The main Ward Boundaries layer provided by the City of Mississauga data portal is not returning geometry data properly. An older version of the layer was used
- The ArcGIS API for Javascript [Popup widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Popup.html) does not consistently return a single feaure from a Feature Layer.
