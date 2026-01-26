# ✈️ Wanderlust

Wanderlust is a full-stack vacation rental platform inspired by Airbnb. It allows users to browse listings, view locations on an interactive map, create their own property listings, and leave reviews. The application is built using the MVC (Model-View-Controller) architecture and emphasizes security and user experience.

## 🚀 Live Demo
## 🛠️ Tech Stack

**Frontend:**
* HTML5, CSS3
* Bootstrap 5 (Responsive Design)
* EJS (Embedded JavaScript Templating)

**Backend:**
* Node.js
* Express.js v5
* Passport.js (Authentication)

**Database:**
* MongoDB (Atlas)
* Mongoose (ODM)

**Tools & APIs:**
* Mapbox SDK (Geocoding & Interactive Maps)
* Cloudinary (Image Storage)
* Multer (File Uploads)
* Joi (Server-side Data Validation)

## ✨ Key Features

* **MVC Architecture:** Organized codebase separating concerns for maintainability.
* **User Authentication:** Secure Signup/Login using `Passport.js` with hashed passwords (PBKdf2).
* **CRUD Operations:** Users can Create, Read, Update, and Delete listings and reviews.
* **Authorization:**
    * Listing owners can edit/delete their listings.
    * Review authors can delete their reviews.
* **Image Uploads:** Direct image upload support via Multer and Cloudinary storage.
* **Geolocation:** Address inputs are automatically converted to coordinates using the Mapbox Geocoding API to display locations on a mapvb.
* **Validation:** Robust client-side (Bootstrap) and server-side (Joi) form validation.
* **Flash Messages:** Interactive feedback for success/error actions.

