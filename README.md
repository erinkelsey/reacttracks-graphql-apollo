# reacttracks-graphql-apollo
React frontend for ReactTracks app

## About
This is a very simple project called ReactTracks. The backend stack is React/GraphQL/Apollo. The backend for this project is reacttracks-django-graphql.

## Features
Auth:
  - Registration
  - Login
  - Signout
  
Tracks:
  - Create Track
  - Update Track
  - Delete Track
  - Track Information
  - Like Track
  - Play Track
  
Profile:
  - User Information
  - Created Tracks
  - Liked Tracks 

## Install
Install Dependencies:

    node install 
    
## Setup
Cloudinary Account:
  - Register for free -> https://cloudinary.com/
  - You will need "Your Cloud Name"
  - Setup an Upload Preset:
    - Settings -> Upload -> Upload Presets
    - You will need "Upload Preset Name"
    - Make sure that the Mode setting is set to "Unsigned"
    
Create .env file in root directory with the following:
  - GraphQL API Endpoint
  - Cloudinary Settings

Example .env file:
  
    REACT_APP_API_URL=http://127.0.0.1:8000/graphql/
    REACT_APP_CLOUDINARY_CLOUD_NAME=mycloud
    REACT_APP_CLOUDINARY_UPLOAD_PRESET_NAME=reacttrackspreset
    
## Run
Start development server:

    npm start

## TODO
- unit tests
- integration tests
