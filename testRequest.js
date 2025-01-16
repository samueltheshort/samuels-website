const axios = require('axios');

const strapiUrl = 'http://localhost:1337'; // Ensure this is correct
const token = '1ddf4b7be252d21b7f5f241b8c405c5cec8d80e0502c338764dd7aeb66b356a66a43c53468b21bd37efdddc0f2d94c8ac572c528f0fd3eea384857df1a2bedd4a115c0c8584f6c763615bc073fa6fd83ee92d01034c4c54afbe786d9852a4bfe7d721f85a70f74418041c4a0614a63101cdc2b91c123763df5c799ad9d115d9d'; // Replace with your actual token

async function testRequest() {
    try {
        const response = await axios.get(`${strapiUrl}/api/images?populate=*`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

testRequest();
