const mongoose = require('mongoose');
const app = require('.');
 // Import the app
require('dotenv').config();

const port = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');

    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (err) {
    if (err.message.includes('querySrv')) {
      console.log('Error: Unable to connect to the database. Please check your internet connection.');
    } else {
      console.log('An unexpected error occurred:', err.message || err);
    }
  }
}

main();
