import axios from 'axios';
const instance = axios.create({
   // Firebase account: go to project - functions - copy API HTTP
    baseURL: 'https://us-central1-app-592dc.cloudfunctions.net/api'
     // the URL of local API endpoint (cloud function) 
    //  generated after 'firebase emulators:start'
    // for testing
    // 'http://localhost:5001/app-592dc/us-central1/api'
});

export default instance;