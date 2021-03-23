import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://us-central1-clone-00000.cloudfunctions.net/api',
  baseURL: 'http://localhost:5001/clone-00000/us-central1/api', // local test
});

export default instance;
