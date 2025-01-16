// strapi.js
export const fetchImages = async () => {
    try {
      // Fetching images from Strapi API and populating the Image field
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/images?populate=Image`);
      
      // If the response is successful, parse the JSON data
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      return { data: [] };  // Return empty data if error occurs
    }
  };
  