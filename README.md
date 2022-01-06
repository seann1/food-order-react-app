![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/w/seann1/food-order-react-app?style=plastic)

![GitHub watchers](https://img.shields.io/github/watchers/seann1/food-order-react-app?style=social)

![GitHub](https://img.shields.io/github/license/seann1/food-order-react-app)

## About The Project

A React app which displays data from a Firebase database. The app displays a list of restaurants. Each restaurant has a menu. A user can log in, add menu items from different restaurants to their cart, and place an order. Orders stored in the database. A logged in user can create a new restaurant. A new restaurant is created with a name, description, address and photo. The address field uses Google Places Autocomplete to generate suggestions for valid addresses. If a restaurant is created with a valid address, its location is geocoded using the Google Maps API, and its location is placed on a map of restaurants. Users can also upload additional photos for restaurants they have created.

To login to the app use the following credentials:
**Email: admin@admin.com**
**Password: password**

### Built With

- [React.js](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [React Router](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/)
- [Google Maps API](https://developers.google.com/maps)

### Installation

1. Get a google API key at [developers.google.com](https://developers.google.com/maps/documentation/javascript/get-api-key)
2. Clone the repo
   ```sh
   git clone https://github.com/seann1/food-order-react-app.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create .env.development and .env.production in root of repo

5. Add this env var to .env.development and .env.production
   ```js
   REACT_APP_API_KEY = YOUR_API_KEY;
   ```
6. run npm start in terminal:
   ```sh
   npm start
   ```
