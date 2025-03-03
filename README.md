# QwikPost

## Overview
**QwikPost** is a server-based post and thought-sharing platform where users can register, log in, and share their ideas and thoughts. The platform ensures a smooth user experience using modern web technologies and authentication methods.

## Features
- **User Authentication**: Secure registration and login using JWT and bcrypt.
- **Post Sharing**: Users can create, edit, and delete posts.
- **Secure Session Management**: Cookies and JWT for authentication.
- **Database Integration**: MongoDB Atlas for storing user data and posts.
- **Dynamic UI**: Tailwind CSS for a responsive and modern design.
- **CRUD Operations**: Basic Create, Read, Update, and Delete operations on posts.
- **Cluster Management**: Ensures scalability and efficiency.
- **Deployment**: Hosted on **Render Web Server**, with project versioning and collaboration through **GitHub**.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Authentication**: JWT, bcrypt, Cookies
- **Database**: MongoDB Atlas
- **Frontend Styling**: Tailwind CSS
- **Hosting & Deployment**: Render, GitHub

## Installation & Setup
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas/database)
- [Git](https://git-scm.com/)

### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/qwikpost.git
   cd qwikpost
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Create a `.env` File** and add your environment variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   ```
4. **Run the Server**
   ```sh
   npm start
   ```
5. **Access the App**
   Open `http://localhost:5000` in your browser.

## Usage
- Register an account and log in.
- Create and share posts.
- View, edit, or delete your posts.
- Logout securely.

## Deployment
QwikPost is deployed on **Render Web Server** and accessible for public use.

## Contributing
Contributions are welcome! Feel free to fork this repo, create a new branch, and submit a pull request.

## License
This project is licensed under the MIT License.

## Author
Developed by **Rajnish Sharma** - Founder & CEO, Rixi Lab.

---
**Follow for Updates!** 🚀
