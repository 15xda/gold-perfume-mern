const fetch = require('node-fetch');  // Ensure you have node-fetch installed
const fs = require('fs');  // Import the fs module for file operations

const apiUrlMS = 'https://api.moysklad.ru/api/remap/1.2/entity/product';
const apiKeyMS = '76adf5d95c3c43a6dde48d5947b27ae6c2f675db';

const fetchProducts =  async () => {
    try {
        const response = await fetch(`${apiUrlMS}?search=${encodeURI('luzi')}&filter=pathName!=Розница&expand=uom&limit=1`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${apiKeyMS}`,
                "Content-Type": "application/json" 
            }
        });

        const data = await response.json();  // Await the JSON response

        // Convert the data into a string (JSON format in this case)
        const dataString = JSON.stringify(data, null, 2);  // Pretty-print JSON with 2 spaces

        // Write the data to a text file (sync method)
        fs.writeFileSync('productsData.txt', dataString, 'utf8');

        console.log('Data saved to productsData.txt');  // Confirmation message
    } catch (err) {
        console.log('Error:', err);  // Handle any errors
    }
};

fetchProducts();  // Call the function to fetch and save the data
