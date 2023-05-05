import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAKS1uKR-Vdhg_poUn3Sz47h_R8HV84Z8w",
  authDomain: "fb-testing-4d315.firebaseapp.com",
  projectId: "fb-testing-4d315",
  storageBucket: "fb-testing-4d315.appspot.com",
  messagingSenderId: "523525819842",
  appId: "1:523525819842:web:6b827f49670b8e543c5a5b",
  databaseURL: "https://fb-testing-4d315-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export default app;