import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAXgg8-sUV-M9RJHIYXCw2yimAq10krXJ0",
	authDomain: "bookwizard-1b9d2.firebaseapp.com",
	projectId: "bookwizard-1b9d2",
	storageBucket: "bookwizard-1b9d2.appspot.com",
	messagingSenderId: "837594763209",
	appId: "1:837594763209:web:7a94acb9f11039a9746218"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };