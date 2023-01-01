// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider, type AppCheck } from 'firebase/app-check';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVhO5-_NfA4V-6aKUkYOZaAYxlFmD2Jfw',
  authDomain: 'osos-69b1a.firebaseapp.com',
  projectId: 'osos-69b1a',
  storageBucket: 'osos-69b1a.appspot.com',
  messagingSenderId: '399343116361',
  appId: '1:399343116361:web:147321876163e73f351f98',
  measurementId: 'G-WDZMRDZJMK',
  databaseURL: 'https://osos-69b1a.firebaseio.com'
};

class FirebaseIntegration {
  app: FirebaseApp | undefined;
  analytics: Analytics | undefined;
  appCheck: AppCheck | undefined;
  database: Firestore | undefined;

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);

    this.analytics = getAnalytics(this.app);

    // if (location.hostname === "localhost") {
    //   (<any>window).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    // }
    // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
    // key is the counterpart to the secret key you set in the Firebase console.
    this.appCheck = initializeAppCheck(this.app, {
      provider: new ReCaptchaV3Provider('abcdefghijklmnopqrstuvwxy-1234567890abcd'),

      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true
    });

    // Initialize Realtime Database and get a reference to the service
    this.database = getFirestore(this.app);
  }

  getDatabase() {
    return this.database;
  }
}

class FirebaseIntegrationFactory {
  static firebaseIntegrationInstance: FirebaseIntegration;

  getFirebaseIntegration(): FirebaseIntegration {
    if (FirebaseIntegrationFactory.firebaseIntegrationInstance === undefined) {
      FirebaseIntegrationFactory.firebaseIntegrationInstance = new FirebaseIntegration();
    }

    return FirebaseIntegrationFactory.firebaseIntegrationInstance;
  }
}

let firebaseFactory = new FirebaseIntegrationFactory();
export default firebaseFactory;
