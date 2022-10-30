const firebaseConfig = {
    apiKey: "AIzaSyBVhO5-_NfA4V-6aKUkYOZaAYxlFmD2Jfw",
    authDomain: "osos-69b1a.firebaseapp.com",
    projectId: "osos-69b1a",
    storageBucket: "osos-69b1a.appspot.com",
    messagingSenderId: "399343116361",
    appId: "1:399343116361:web:147321876163e73f351f98",
    measurementId: "G-WDZMRDZJMK"
  };

  import { initializeApp } from 'firebase/app';
  import { initializeAnalytics, logEvent } from 'firebase/analytics';

const firebaseApp = initializeApp(firebaseConfig);
export const anal = initializeAnalytics(firebaseApp);

export function GAPageView() {
    logEvent(anal, 'page_view', {
      page_location: window.location.href,
    });
  }
