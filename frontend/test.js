import axios from 'axios';

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:5001/search', {params: {term: 'luzi'} })

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching the data: ', error.message);
    }
    
}

fetchData();