import axios from 'axios';
import { useEffect, useState } from 'react';

const ClimateActionGallery = () => {
    const [images, setImages] = useState([]);
    const [validImages, setValidImages] = useState([]);
    const apiKey = '2f1lLmhhU8xbxBU3U67sBZppzfb7XpvmtnQovPXg'; // Insert your API key here

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`);

                if (response.status === 200) {
                    const data = response.data;

                    // Dynamically construct URLs for each image
                    const imageUrls = data.map((image) => {
                        const date = new Date(image.date);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so +1
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image.image}.png`;

                        return {
                            url: imageUrl,
                            date: image.date,
                            caption: image.caption
                        };
                    });

                    setImages(imageUrls);
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [apiKey]);

    // Remove images that fail to load
    const handleImageError = (index) => {
        const filteredImages = validImages.filter((_, i) => i !== index);
        setValidImages(filteredImages);
    };

    useEffect(() => {
        // Initially, validImages should be the same as images, then filter out broken ones
        setValidImages(images);
    }, [images]);

    return (
        <div>
            <h2 className='text-center text-4xl font-bold p-4'>Climate Action: Earth Images</h2>
            <div className="image-gallery grid grid-cols-3  gap-3">
                {validImages.map((image, index) => (
                    <div key={index} className='rounded-md border p-4 shadow-lg'>
                        <img
                            src={image.url}
                            alt={`Earth on ${image.date}`}
                            onError={() => handleImageError(index)} // Handle broken images
                            height={600}
                            width={600}
                            className='rounded-lg'
                        />
                        <p>Date: {new Date(image.date).toUTCString()}</p>
                        <p>Credit: {image.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClimateActionGallery;
