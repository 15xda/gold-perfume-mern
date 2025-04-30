const apiUrlMS = process.env.MOYSKLAD_API_ENDPOINT;
const apiKeyMS = process.env.MOYSKLAD_SECRET_KEY;

const returnSafeMoyskladData = (data) => {
    if (!data || typeof data !== 'object') return null;

    const dataList = Array.isArray(data) ? data : [data];

    const filteredData = dataList.map(product => {
        return {
            id: product.id,
            name: product.name,
            salePrices: (product.salePrices[0].value / 100).toFixed(2),
            uom: {
                name: product.uom.name,
                description: product.uom.description
            }
        };
    });
    
    return Array.isArray(data) ? filteredData : filteredData[0] || null;
};

const searchProducts = async (searchTerm, limit, offset) => {
    try {
        const response = await fetch(
            `${apiUrlMS}?search=${encodeURI(searchTerm)}&filter=pathName!=Розница&expand=uom&limit=${limit || 10}&offset=${offset || 0}`, 
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${apiKeyMS}`,
                    "Content-Type": "application/json" 
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const products = returnSafeMoyskladData(data.rows);
        const total = data.meta.size;

        return {
            products,
            total,
            totalPages: Math.ceil(total / (limit ? limit : 10)),
            limit: limit || 10, 
            offset: offset || 0,
        };

    } catch (error) {
        console.error("Error fetching data from Moysklad:", error);
        throw error;
    }
};

const getProductById = async (productId) => {
    try {
        const response = await fetch(
            `${apiUrlMS}/${productId}?expand=uom`, 
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${apiKeyMS}`,
                    "Content-type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to Find The Product With Status: ${response.status}`);
        }

        const data = await response.json();
        return returnSafeMoyskladData(data);
    } catch (error) {
        console.error("Error fetching product data:", error.message);
        throw error;
    }
};

const getProductsByBatchIds = async (pIds) => {
    try {

        const iDfilterString = pIds.map(id => `id=${id}`).join(';');

        const response = await fetch(
            `${apiUrlMS}?filter=${iDfilterString}&expand=uom&limit=100`,
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${apiKeyMS}`,
                    "Content-type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to load products by batch IDs');
        }

        const data = await response.json();
        
        return returnSafeMoyskladData(data.rows);
    } catch (error) {
        console.error("Error fetching batch product data:", error.message);
        throw error;
    }
};

module.exports = {
    searchProducts,
    getProductById,
    getProductsByBatchIds
};