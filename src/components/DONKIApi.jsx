import axios from 'axios';
import { useEffect, useState } from 'react';

const SpaceWeatherData = () => {
    const [spaceEvents, setSpaceEvents] = useState([]);
    const apiKey = '2f1lLmhhU8xbxBU3U67sBZppzfb7XpvmtnQovPXg'; // Insert your NASA API key here

    // Function to get the current date in 'YYYY-MM-DD' format
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchSpaceWeatherData = async () => {
            try {
                const currentDate = getCurrentDate();
                const response = await axios.get(`https://api.nasa.gov/DONKI/notifications?startDate=${currentDate}&endDate=${currentDate}&api_key=${apiKey}`);

                if (response.status === 200) {
                    setSpaceEvents(response.data);
                }
            } catch (error) {
                console.error('Error fetching space weather data:', error);
            }
        };

        fetchSpaceWeatherData();
    }, [apiKey]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Space Weather Events</h2>
            <div className="space-weather-events space-y-6">
                {spaceEvents.length > 0 ? (
                    spaceEvents.map((event, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-blue-600">{event.messageID}</h3>
                            <p className="text-gray-600 text-sm">
                                Date of Event: <span className="font-medium">{new Date(event.messageIssueTime).toUTCString()}</span>
                            </p>
                            <p className="text-gray-700 mt-2">{event.messageBody || "No description available"}</p>
                            <a href={event.messageURL} className="text-blue-500 hover:underline mt-4 block">View More Details</a>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No space weather events for today.</p>
                )}
            </div>
        </div>
    );
};

export default SpaceWeatherData;
