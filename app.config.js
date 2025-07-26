const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  "expo": {
    "name": IS_DEV ? "Aegis (Dev)" : "Aegis",
    "slug": "aegis-frontend",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "aegis",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "plugins": ["expo-font"],
    "extra": {
      "firebaseApiKey": "AIzaSyCcCdqh9fn84o8rqk9CbPQsmOSQDD0QWno",
      "firebaseAuthDomain": "aegis-frontend.firebaseapp.com",
      "firebaseProjectId": "aegis-frontend",
      "firebaseStorageBucket": "aegis-frontend.appspot.com",
      "firebaseMessagingSenderId": "your_messaging_sender_id",
      "firebaseAppId": "your_app_id",
      "eas": {
        "projectId": "your_eas_project_id"
      }
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": IS_DEV ? "com.aegis.app.dev" : "com.aegis.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": IS_DEV ? "com.aegis.app.dev" : "com.aegis.app"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "firebaseApiKey": process.env.FIREBASE_API_KEY,
      "firebaseAuthDomain": process.env.FIREBASE_AUTH_DOMAIN,
      "firebaseProjectId": process.env.FIREBASE_PROJECT_ID,
      "firebaseStorageBucket": process.env.FIREBASE_STORAGE_BUCKET,
      "firebaseMessagingSenderId": process.env.FIREBASE_MESSAGING_SENDER_ID,
      "firebaseAppId": process.env.FIREBASE_APP_ID,
      "testUserEmail": process.env.TEST_USER_EMAIL,
      "testUserPassword": process.env.TEST_USER_PASSWORD
    }
  }
};
