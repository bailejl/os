// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  type AppCheck
} from "firebase/app-check";
import { getAnalytics, type Analytics } from "firebase/analytics";
import {
  getFirestore,
  Firestore,
  connectFirestoreEmulator
} from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  type Auth
} from "firebase/auth";
import { context, Context } from "../../../security/context";

const firebaseConfig = {
  apiKey: "AIzaSyAzDFfjdQ-DubRMGBybtHgbiSmjGTLunxw",
  authDomain: "osos-373518.firebaseapp.com",
  projectId: "osos-69b1a",
  storageBucket: "osos-69b1a.appspot.com",
  messagingSenderId: "399343116361",
  appId: "1:399343116361:web:147321876163e73f351f98",
  measurementId: "G-WDZMRDZJMK",
  databaseURL: "https://osos-69b1a.firebaseio.com"
};

export class FirebaseIntegration {
  app: FirebaseApp;
  analytics: Analytics | undefined;
  appCheck: AppCheck | undefined;
  database: Firestore;
  auth: Auth;

  constructor() {
    let hostname = (<any>window).location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      // (<any>window).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      this.app = initializeApp(firebaseConfig);
      const auth = getAuth();
      connectAuthEmulator(auth, "http://localhost:9099");
      this.auth = auth;
      const db = getFirestore();
      connectFirestoreEmulator(db, "localhost", 8080);
      this.database = db;
    } else {
      // Initialize Firebase
      this.app = initializeApp(firebaseConfig);
      const auth = getAuth();
      this.auth = auth;
      this.analytics = getAnalytics(this.app);
      this.appCheck = initializeAppCheck(this.app, {
        provider: new ReCaptchaV3Provider(
          "abcdefghijklmnopqrstuvwxy-1234567890abcd"
        ),

        // Optional argument. If true, the SDK automatically refreshes App Check
        // tokens as needed.
        isTokenAutoRefreshEnabled: true
      });

      // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
      // key is the counterpart to the secret key you set in the Firebase console.
      // Initialize Realtime Database and get a reference to the service
      this.database = getFirestore(this.app);
    }
  }

  getDatabase() {
    return this.database;
  }
}

class FirebaseIntegrationFactory {
  static firebaseIntegrationInstance: FirebaseIntegration;

  getFirebaseIntegration(): FirebaseIntegration {
    if (FirebaseIntegrationFactory.firebaseIntegrationInstance === undefined) {
      console.log("Loading Firebase");
      FirebaseIntegrationFactory.firebaseIntegrationInstance =
        new FirebaseIntegration();
    }

    return FirebaseIntegrationFactory.firebaseIntegrationInstance;
  }
}

let firebaseFactory = new FirebaseIntegrationFactory();
export default firebaseFactory;

export async function firebaseUsernamePassowordLogin(
  email: string,
  password: string
) {
  let auth = FirebaseIntegrationFactory.firebaseIntegrationInstance.auth;

  // Sign in with tenant
  await signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      // User is signed in.
      context.update((n) => new Context(userCredential.user));
    }
  );
}
