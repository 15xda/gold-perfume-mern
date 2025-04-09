require('dotenv').config();

const apiUrl = "https://api.moysklad.ru/api/remap/1.2/entity/product";
const searchQuery = "0015d864-0bac-11ef-0a80-017d00428fbf"; 
const apiKey = process.env.MOYSKLAD_SECRET_KEY; 

fetch(`${apiUrl}/${searchQuery}`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json" 
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));
