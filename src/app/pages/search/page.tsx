'use client';

import React, { useState } from 'react';
import { Book } from '@/app/models/Book';
import Highlighter from 'react-highlight-words';

const Search = () => {
    const [query, setQuery] = useState('');
    const [queryOld, setQueryOld] = useState('');
    const [results, setResults] = useState<Book[]>([]);
    const [darkMode, setDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(6);
    const [selectAuthor, setSelectAuthor] = useState(false);
    const [selectISBN, setSelectISBN] = useState(false);
    const [selectDescription, setSelectDescription] = useState(false);
    const [selectTitle, setSelectTitle] = useState(false);

    const books: Book[] = [
        {productURL: 'https://example.com/books/great-gatsby', imageURL: 'https://example.com/images/great-gatsby.jpg', title: 'The Great Gatsby', authors: 'F. Scott Fitzgerald', isbn: '9780743273565', description: 'A novel set in the Roaring Twenties.'},
        {productURL: 'https://example.com/books/1984', imageURL: 'https://example.com/images/1984.jpg', title: '1984', authors: 'George Orwell', isbn: '', description: 'Dystopian novel about totalitarianism.'},
        {productURL: 'https://example.com/books/to-kill-a-mockingbird', imageURL: 'https://example.com/images/to-kill-a-mockingbird.jpg', title: 'To Kill a Mockingbird', authors: 'Harper Lee', isbn: '9780061120084', description: 'A novel about racial injustice.'},
        {productURL: 'https://example.com/books/the-catcher-in-the-rye', imageURL: 'https://example.com/images/the-catcher-in-the-rye.jpg', title: 'The Catcher in the Rye', authors: 'J.D. Salinger', isbn: '9780316769174', description: 'A novel about teenage angst.'},
        {productURL: 'https://example.com/books/the-great-gatsby', imageURL: 'https://example.com/images/the-great-gatsby.jpg', title: 'The Great Gatsby', authors: 'F. Scott Fitzgerald', isbn: '9780743273565', description: 'A novel about the American Dream.'},
        {productURL: 'https://example.com/books/the-adventures-of-tom-sawyer', imageURL: 'https://example.com/images/the-adventures-of-tom-sawyer.jpg', title: 'The Adventures of Tom Sawyer', authors: 'Mark Twain', isbn: '9780486280538', description: 'A novel about a mischievous young boy.'},
        {productURL: 'https://example.com/books/the-adventures-of-huckleberry-finn', imageURL: 'https://example.com/images/the-adventures-of-huckleberry-finn.jpg', title: 'The Adventures of Huckleberry Finn', authors: 'Mark Twain', isbn: '9780486280613', description: 'A novel about a young boy and his journey down the Mississippi River.'},
        {productURL: 'https://example.com/books/the-little-prince', imageURL: 'https://example.com/images/the-little-prince.jpg', title: 'The Little Prince', authors: 'Antoine de Saint-Exup ry', isbn: '9780152023981', description: 'A novel about a young prince and his journey to other planets.'},
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
        <div className={`${paginatedResults.length === 0 ? 'h-screen' : 'h-full'} w-screen mx-auto p-8 md:p-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className="flex items-center mb-4 flex-row justify-between">
                <h1 className="text-3xl font-bold mb-4">Book Search Engine</h1>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="sr-only" />
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
            <div id="results" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedResults.map((book, index) => (
                    <div key={index} className={`p-4 rounded shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        <img src={book.imageURL} alt={book.title} className="w-32 h-60 object-cover mb-2" />
                        <h3 className="text-xl font-bold">                        
                        <Highlighter
                            searchWords={[queryOld]}  // Wrap query in an array
                            textToHighlight={book.title}
                            highlightStyle={{ backgroundColor: 'yellow' }}
                        /></h3>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Author:                         <Highlighter
                            searchWords={[queryOld]}  // Wrap query in an array
                            textToHighlight={book.authors}
                            highlightStyle={{ backgroundColor: 'yellow' }}
                        /></p>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>ISBN: {book.isbn === "" ? 'N/A' :   <Highlighter
                            searchWords={[queryOld]}  // Wrap query in an array
                            textToHighlight={book.isbn}
                            highlightStyle={{ backgroundColor: 'yellow' }}
                        />}
                        </p>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description: 
                        <Highlighter
                                searchWords={[queryOld]}  // Wrap query in an array
                                textToHighlight={book.description}
                                highlightStyle={{ backgroundColor: 'yellow' }}
                            />
                        </p>
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