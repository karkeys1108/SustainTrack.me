import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeOb938LNrMYbsD5MEZlw-WQgvxzD85dg",
    authDomain: "login-for-sustain.firebaseapp.com",
    databaseURL: "https://login-for-sustain-default-rtdb.firebaseio.com",
    projectId: "login-for-sustain",
    storageBucket: "login-for-sustain.appspot.com",
    messagingSenderId: "110394709519",
    appId: "1:110394709519:web:1becc6c3c224b327edf57a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Check authentication state
onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (loggedInUserId) {
    console.log(user);
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById('loggedUserFName').innerText = userData.firstName;
          document.getElementById('loggedUserEmail').innerText = userData.email;
          document.getElementById('loggedUserLName').innerText = userData.lastName;
        } else {
          console.log("No document found matching the ID");
        }
      })
      .catch((error) => {
        console.log("Error getting document", error);
      });
  } else {
    console.log("User ID not found in local storage");
  }
});

// Logout
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
    .then(() => {
      window.location.href = 'login.html';
    })
    .catch((error) => {
      console.error('Error Signing out:', error);
    });
});
document.getElementById('goMainPage').onclick = function() {
    window.location.href = 'index.html';
};
document.addEventListener("DOMContentLoaded", function() {
  const profileImg = document.getElementById("profile-img");
  const imageUpload = document.getElementById("image-upload");

  // Add event listener to the image upload input
  imageUpload.addEventListener("change", function() {
      const file = this.files[0]; // Get the selected file

      // Check if a file is selected and it's an image
      if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();

          // Set up the reader to read the selected image file
          reader.onload = function(event) {
              profileImg.src = event.target.result; // Set the profile image source to the selected image
          };

          // Read the selected image file as a data URL
          reader.readAsDataURL(file);
      }
  });
});
