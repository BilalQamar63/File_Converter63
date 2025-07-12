import { Link } from 'react-router-dom';
import '../App.css';
import { FaSearch, FaFileCsv, FaCode, FaArrowRight , FaImage } from "react-icons/fa";
import { LuSpeech } from "react-icons/lu";
import { useState } from 'react';

const Home = () => {

    // SEARCH FUNCTIONALITY
    const [searchTerm, setSearchTerm] = useState('');

    // CONVERSIONS LIST
    const conversions = [
        {
            path: '/csvToJson',
            label: 'Convert CSV to JSON',
            icon: <FaFileCsv className='conversion-icon' />
        },
        {
            path: '/jsonToCsv',
            label: 'Convert JSON to CSV',
            icon: <FaCode className='conversion-icon' />
        },
        {
            path:'/imageToText',
            label: 'Image To Text',
            icon: <FaImage className='conversion-icon' />
        },
        {
            path: '/imgOptimizer',
            label: 'Image Size Compression',
            icon: <FaImage className='conversion-icon' />
        },
        {
            path: '/imgBgRemover',
            label: 'Image Background Remover',
            icon: <FaImage className='conversion-icon' />
        },
        {
            path: '/textToSpeech',
            label: 'Text To Speech',
            icon: <LuSpeech className='conversion-icon' />
        },
        
    ]

    const filteredConversions = conversions.filter(item => item.label.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );


    return (
        <div className="home-container">
            <h1 className="home-title">File's Converter App</h1>

            <div className="search-container">
                {searchTerm === '' && <FaSearch className='search-icon' />}
                <input
                    type="text"
                    placeholder="Search conversions..."
                    className="home-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ul className="conversion-list">
                {filteredConversions.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path} className='conversion-link'>
                            {item.icon}
                            {item.label}
                            <FaArrowRight className='right-arrow' />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
