import axios from 'axios';

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:4004/api/products/get-top-ten')

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching the data: ', error.message);
    }
    
}

fetchData();