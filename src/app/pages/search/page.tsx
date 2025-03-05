'use client';

import React, { useState } from 'react';
import { Book } from '@/app/models/Book';
import Highlighter from 'react-highlight-words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [query, setQuery] = useState('');
    const [queryOld, setQueryOld] = useState('');
    const [results, setResults] = useState<Book[]>([]);
    const [darkMode, setDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [selectAuthor, setSelectAuthor] = useState(true);
    const [selectISBN, setSelectISBN] = useState(true);
    const [selectDescription, setSelectDescription] = useState(true);
    const [selectTitle, setSelectTitle] = useState(true);

    const books: Book[] = [
        {productURL: 'https://www.chulabook.com/test-prep/193428', imageURL: 'https://api.chulabook.com/images/pid-193428.jpg', title: 'เตรียมสอบสังคม ม.ปลาย ฉบับพร้อมเก็บคะแนนทุกสนามสอบ A-LEVEL (สังคมแมวส้ม)', authors: 'F. Scott Fitzgerald', isbn: '9780743273565', description: 'A novel set in the Roaring Twenties.'},
        {productURL: 'https://www.chulabook.com/test-prep/4707', imageURL: 'https://api.chulabook.com/images/pid-4707.JPG', title: 'เตรียมสอบ คณิตศาสตร์ ม.3 เข้า ม.4 (เตรียมอุดม มหิดลวิทยานุสรณ์ สาธิตฯ) :เตรียมสอบ เด็กสายวิทย์', authors: 'George Orwell', isbn: '', description: 'Dystopian novel about totalitarianism.'},
        {productURL: 'https://www.chulabook.com/test-prep/193429', imageURL: 'https://api.chulabook.com/images/pid-193429.JPG', title: 'To Kill a Mockingbird', authors: 'Harper Lee', isbn: '9780061120084', description: 'A novel about racial injustice.'},
        {productURL: 'https://www.chulabook.com/family-and-children/4678', imageURL: 'https://api.chulabook.com/images/pid-4678.JPG', title: 'The Catcher in the Rye', authors: 'J.D. Salinger', isbn: '9780316769174', description: 'A novel about teenage angst.'},
        {productURL: 'https://www.chulabook.com/test-prep/193431', imageURL: 'https://1568886761.rsc.cdn77.org/books/24288/Thumbnail/large.gif?', title: 'The Great Gatsby', authors: 'F. Scott Fitzgerald', isbn: '9780743273565', description: 'A novel about the American Dream.'},
        {productURL: 'https://www.chulabook.com/test-prep/193432', imageURL: 'https://1568886761.rsc.cdn77.org/books/24289/Thumbnail/large.gif?', title: 'The Adventures of Tom Sawyer', authors: 'Mark Twain', isbn: '9780486280538', description: 'A novel about a mischievous young boy.'},
        {productURL: 'https://www.chulabook.com/test-prep/159794', imageURL: '	https://api.chulabook.com/images/pid-159794.jpg', title: 'The Adventures of Huckleberry Finn', authors: 'Mark Twain', isbn: '9780486280613', description: 'A novel about a young boy and his journey down the Mississippi River.'},
        {productURL: 'https://www.chulabook.com/test-prep/193433', imageURL: '	https://1568886761.rsc.cdn77.org/books/24290/Thumbnail/large.gif?', title: 'The Little Prince', authors: 'Antoine de Saint-Exup ry', isbn: '9780152023981', description: 'A novel about a young prince and his journey to other planets.'},
        {productURL: 'https://example.com/books/the-iliad-and-the-odyssey', imageURL: 'https://example.com/images/the-iliad-and-the-odyssey.jpg', title: 'The Iliad and The Odyssey', authors: 'Homer', isbn: '9780684827764', description: 'Two epic poems about the Trojan War.'},
        {productURL: 'https://example.com/books/the-kite-runner', imageURL: 'https://example.com/images/the-kite-runner.jpg', title: 'The Kite Runner', authors: 'Khaled Hosseini', isbn: '9781570626103', description: 'A novel about the relationship between two childhood friends in Afghanistan.'},
        {productURL: 'https://example.com/books/the-alchemist', imageURL: 'https://example.com/images/the-alchemist.jpg', title: 'The Alchemist', authors: 'Paulo Coelho', isbn: '9780061122415', description: 'A novel about a young shepherd and his journey to fulfill his personal legend.'},
        {productURL: 'https://example.com/books/the-nightingale', imageURL: 'https://example.com/images/the-nightingale.jpg', title: 'The Nightingale', authors: 'Kristin Hannah', isbn: '9780312577223', description: 'A novel about two sisters and their struggles in France during World War II.'}
    ];

    const handleSearch = () => {
        const filteredBooks = books.filter(book => {
            if (selectAuthor) {
                return book.authors.toLowerCase().includes(query.toLowerCase());
            }
            if (selectISBN) {
                return book.isbn.toLowerCase().includes(query.toLowerCase());
            }
            if (selectDescription) {
                return book.description.toLowerCase().includes(query.toLowerCase());
            }
            if (selectTitle) {
                return book.title.toLowerCase().includes(query.toLowerCase());
            }
            return book.title.toLowerCase().includes(query.toLowerCase());
        });
        setResults(filteredBooks);
        setQueryOld(query);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleClick = (page: number) => () => {
        setCurrentPage(page);
    };

    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginatedResults = results.slice(start, end);

    return (
        <div className={`${paginatedResults.length <=5 ? 'h-screen' : 'h-full'} w-screen mx-auto p-8 md:p-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} overflow-y-scroll`}>
            <div className="flex items-center mb-4 flex-row justify-between">
                <h1 className="text-3xl font-bold mb-4">Book Search Engine</h1>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="sr-only" id="dark-mode" />
                    <label htmlFor="dark-mode" className="flex items-center cursor-pointer">
                        {darkMode ? <FontAwesomeIcon icon={faMoon} className="w-6 h-6" /> : <FontAwesomeIcon icon={faSun} className="w-6 h-6" />}
                    </label>
                    <div className="w-11 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                    <div className={`absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </label>
            </div>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for books..."
                    className="flex-1 px-4 py-2 border rounded-full shadow mr-4"
                />
                <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Search
                </button>
            </div>
            <div className="flex items-center mb-4">
                <label className="mr-4">
                    <input type="checkbox" checked={selectAuthor} onChange={() => setSelectAuthor(!selectAuthor)} className="mr-2" />
                    Author
                </label>
                <label className="mr-4">
                    <input type="checkbox" checked={selectISBN} onChange={() => setSelectISBN(!selectISBN)} className="mr-2" />
                    ISBN
                </label>
                <label className="mr-4">
                    <input type="checkbox" checked={selectDescription} onChange={() => setSelectDescription(!selectDescription)} className="mr-2" />
                    Description
                </label>
                <label className="mr-4">
                    <input type="checkbox" checked={selectTitle} onChange={() => setSelectTitle(!selectTitle)} className="mr-2" />
                    Title
                </label>
            </div>
            <div id="results" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {paginatedResults.map((book, index) => (
                    <div key={index} onClick={() => window.open(`${book.productURL}`, '_blank')} className={`p-4 rounded shadow ${darkMode ? 'bg-gray-700' : 'bg-white'} cursor-pointer flex flex-col justify-between`}>
                        <div>
                        <img src={book.imageURL} alt={book.title} className="h-90 object-cover mb-2" />
                        <h3 className="text-xl font-bold">                        
                        <Highlighter
                            searchWords={[queryOld]}  // Wrap query in an array
                            textToHighlight={book.title}
                            highlightStyle={{ backgroundColor: 'yellow' }}
                        /></h3>
                        </div>
                        <div className="mt-2">
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className='font-bold'>
                            Author: 
                        </span>                    
                        <Highlighter
                            searchWords={[queryOld]}  // Wrap query in an array
                            textToHighlight={book.authors}
                            highlightStyle={{ backgroundColor: 'yellow' }}
                        />
                        </p>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className='font-bold'>
                            ISBN:
                        </span> 
                        {book.isbn === "" ? 'N/A' :   
                        <Highlighter
                            searchWords={[queryOld]}  // Wrap query in an array
                            textToHighlight={book.isbn}
                            highlightStyle={{ backgroundColor: 'yellow' }}
                        />}
                        </p>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className='font-bold'>Description: </span> 
                        <Highlighter
                                searchWords={[queryOld]}  // Wrap query in an array
                                textToHighlight={book.description}
                                highlightStyle={{ backgroundColor: 'yellow' }}
                            />
                        </p>
                        </div>
                    </div>
                ))}
                {paginatedResults.length === 0 && <p className={`w-full h-full flex items-center justify-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No results found.</p>}
            </div>
            <div className="flex items-center justify-center mt-4">
                {[...Array(Math.ceil(results.length / resultsPerPage)).keys()].map(page => (
                    <button
                        key={page}
                        onClick={handleClick(page + 1)}
                        className={`mx-1 px-4 py-2 rounded-full ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Search;