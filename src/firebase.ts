import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyB_l50-cnf9sBb6ODEB85jzg83s7ucAqz0',
	authDomain: 'mern-ecom-project.firebaseapp.com',
	projectId: 'mern-ecom-project',
	storageBucket: 'mern-ecom-project.appspot.com',
	messagingSenderId: '304008170033',
	appId: '1:304008170033:web:4313f1ccbcf9496c77e310',
	measurementId: 'G-BCLVK397EV',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
