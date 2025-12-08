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

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/wanderlust.git](https://github.com/yourusername/wanderlust.git)
    cd wanderlust
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    zb
    CLOUD_NAME=your_cloudinary_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MAP_TOKEN=your_mapbox_public_token
    ATLASDB_URL=your_mongodb_connection_string
    SECRET=your_session_secret
    ```

4.  **Seed the Database (Optional)**
    To populate the database with sample data:
    ```bash
    node init/index.js
    ```

5.  **Run the Server**
    ```bash
    node app.js
    # or if you have nodemon installed
    nodemon app.js
    ```

6.  **Visit the App**
    Open your browser and go to `http://localhost:8080`

## 📸 Screenshots

## 🛡️ Security
* Password hashing and salting.
* Session-based authentication with `connect-mongo` for persistent sessions.
* Protection against common web vulnerabilities (via Joi validation and proper error handling).

## 📄 License
This project is open-source and available under the [ISC License](LICENSE).
