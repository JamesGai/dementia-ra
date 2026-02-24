# Dementia RA

The main requirement for the RA role is to use the [e-DiVA website](https://ediva.org/) and the **WHO iSupport manual** to develop a mobile app (iOS/Android) for family carers of people with dementia (who provide most of the care).

The app will explain behaviours associated with dementia and offer strategies for managing them, potentially through videos, written/verbal guidance, and—if feasible—an empathetic interactive AI avatar. The app will also provide self-help resources for carers, aligned with the content on the website. We plan to incorporate the digital AI avatar feature into the mobile app.

![Project Proposal](/public/Proposal.png)

## Tech Stack

### Frontend

- **Ionic Angular / Ionic React**
  - Ionic is an open-source UI toolkit or framework for building **cross-platform mobile applications** with integration of web development frameworks (e.g. Angular, React).
  - [Ionic Angular Overview | Ionic Framework](https://ionicframework.com/docs/angular)

- **Tailwind CSS**
  - A utility-first CSS framework used to build custom and responsive user interfaces efficiently.

### Native Runtime

- **Capacitor**
  - An open-source native runtime layer that allows a web application to run as a real mobile app on **iOS and Android**, with access to native device features (e.g. camera, file system).
  - [Capacitor by Ionic – Cross-platform apps with web technology](https://capacitorjs.com)

### Backend

- **Flask**
  - A Flask server that hosts our chatbot service
  - Repo available [here](https://github.com/JamesGai/dementia-ra-chatbot.git)

### Chatbot API setup (frontend)

- `VITE_CHATBOT_API_URL` is optional and defaults to `/api/gemini`.
- Example `.env.local`:

```bash
VITE_CHATBOT_API_URL=/api/gemini
```

- In development, Vite proxies `/api/*` to `http://127.0.0.1:5000` (configured in `vite.config.ts`) to avoid browser CORS issues.

### Database

- **Firebase**
  - Firebase Auth
    - Handle user login information
  - Firestore
    - Stores project data
  - Firebase Storage
    - Planning to store all images, videos, and documents

## Instructions

### How to run this mobile app on Android and iOS?

### Android

- Download **Android Studio** on Windows
- Build the project
- Download Android Studio on Windows
- Build the project
  - `ionic build`
- Add Android native platform
  - `ionic cap add android`
- Run Android app
  - `ionic cap open android`
  - Click run on Android Studio

### iOS

- Download **XCode** from App Store on Mac
- Build the project
  - `ionic build`
- Add iOS native platform
  - `ionic cap add ios`
- Run iOS app
  - ` ionic cap open ios`
  - Click run on XCode

### How to configure Firebase to the project?

- `npm install firebase`

## Project Management

This project is being tracked on Trello, ask permission to join and visit.
