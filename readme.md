

# Sickfits

An E-commerce web application designed to buy/sell trainers. Consumers can add items to cart and make a purchase via Stripe. This website is currently in test mode.

The following are features of the web-app:

- Create, Read, Update, Delete products
- Sign In, Sign Up and Password Reset
- Add products to cart
- Make payments via Stripe
- View orders

Check out the live [demo!](https://sickfits-steven.co.uk)

# Installation

### `npm install`

download the node_modules. Next create a .env file for the backend and fill the following:
CLOUDINARY_CLOUD_NAME,
CLOUDINARY_KEY,
CLOUDINARY_SECRET,
COOKIE_SECRET,
DATABASE_URL,
STRIPE_SECRET,
MAIL_HOST,
MAIL_PORT,
MAIL_USER,
MAIL_PASS,
FRONTEND_URL=http://localhost:7777


### `npm run dev`

Runs the app in the development mode.<br />
For the front end:
Open [http://localhost:7777](http://localhost:7777) to view it in the browser.

For the back end:
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

