import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyDNm6XjpKWmE5fb6y19ITJByPLunMnpSPI",
    authDomain: "test-e847f.firebaseapp.com",
    databaseURL: "https://test-e847f.firebaseio.com",
    projectId: "test-e847f",
    storageBucket: "test-e847f.appspot.com",
    messagingSenderId: "937619158003"
};
firebase.initializeApp(config);

export default firebase;