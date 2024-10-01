import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">NASA Space Data</h1>
            <div className="flex space-x-4">
                {/* Navigation buttons */}
                <Link to="/epic">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
                        EPIC Image Gallery
                    </button>
                </Link>
                <Link to="/donki">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300">
                        Space Weather Data (DONKI)
                    </button>
                </Link>
            </div>
        </div>
    );
}
