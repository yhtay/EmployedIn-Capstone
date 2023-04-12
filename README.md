# EmployedIn

## About

[Employedin](https://employedin.onrender.com/) is a Full-Stack web application that was inspired by LinkedIn. It is a platform that allows users to create personal profile create posts and comments and also list their skills.

Project Link: https://employedin.onrender.com/

## Tech Stack

### Frontend:
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React-Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

### Backend:
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### Languages:
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## Features

### Splash Page

![EmployedIn-splash-page](./readme-images/employedin_project_pic.png)

### Posts

Upon sign up, users can create their own post, edit and delete them.
![EmployedIn-post-page](./readme-images/post-page.png)

### Comments

Users can leave comments on any post on EmployedIn and are able to edit and delete their own comments, via ellipse icon

![EmployedIn-comments](./readme-images/comment-section.png)

### Skills
Users can add and remove skills to their personal profile.

![EmployedIn-skills](./readme-images/skills-section.png)

## Future Implementations

### Endorsements

Users will be able to endorse other users' skills or remove endorsements

### Direct Messaging

Users will be able to send direct messages to other users

## Run Locally

## Getting started
1. Clone this repository:

   `
   https://github.com/yhtay/EmployedIn-Capstone.git
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   ```
   npm install
   ```

3. Create a **.env** file using the **.envexample** provided

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed:

   ```
   npx dotenv sequelize db:create &&
   npx dotenv sequelize db:migrate &&
   npx dotenv sequelize db:seed:all
   ```

5. Start the app for both backend and frontend using:

   ```
   npm start
   ```
   to run the frontend
   ```
   flask run
   ```
   to run the backend

6. Now you can use the Demo User or Create an account
