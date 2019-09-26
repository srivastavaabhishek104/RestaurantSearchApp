import axios from 'axios';

export default axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1/',
    headers: {
        'user-key': '97f0da213c195e79d296996c7db9bec7'
    }
});