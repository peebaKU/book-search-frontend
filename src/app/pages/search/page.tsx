'use client';

import React, { useState } from 'react';
import { Book } from '@/app/models/Book';
import Highlighter from 'react-highlight-words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Loading from '@/app/components/Loading';

const Search = () => {
    const [query, setQuery] = useState('');
    const [queryOld, setQueryOld] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [selectAuthor, setSelectAuthor] = useState(true);
    const [selectISBN, setSelectISBN] = useState(true);
    const [selectDescription, setSelectDescription] = useState(true);
    const [selectTitle, setSelectTitle] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [totalHits, setTotalHits] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [paginatedResults, setPaginatedResults] = useState<Book[]>([]);
    const fetchData = async (page: number) => {
        setIsLoading(true);
        console.log('fetchData', page);
        try {
            const response = await fetch('http://100.70.0.1:3000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    queryString: query,
                    queryOption: {
                        useTitle: selectTitle,
                        useIsbn: selectISBN,
                        useDescription: selectDescription,
                        useAuthors: selectAuthor,
                    },
                    page: page,
                    pageSize: resultsPerPage,
                }),
            });
            const data = await response.json();
            setTotalHits(data.totalHits);
            setPageSize(data.pageSize);
            setCurrentPage(page);
            setPaginatedResults(data.books.slice(0, data.books.length));
            console.log(data.books);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = (page: number) => () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
        fetchData(page);
    };

    const handlePerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(Number(e.target.value)>0){
            setResultsPerPage(Number(e.target.value));
        }
    };

    const books: Book[] = [
        {url: 'https://www.chulabook.com/test-prep/193428', imageUrl: 'https://api.chulabook.com/images/pid-193428.jpg', title: 'เตรียมสอบสังคม ม.ปลาย ฉบับพร้อมเก็บคะแนนทุกสนามสอบ A-LEVEL (สังคมแมวส้ม)', authors: ['F. Scott Fitzgerald','F. Scott Fitzgerald'], isbn: '9780743273565', description: 'A novel set in the Roaring Twenties.'},
        {url: 'https://www.chulabook.com/test-prep/4707', imageUrl: 'https://api.chulabook.com/images/pid-4707.JPG', title: 'เตรียมสอบ คณิตศาสตร์ ม.3 เข้า ม.4 (เตรียมอุดม มหิดลวิทยานุสรณ์ สาธิตฯ) :เตรียมสอบ เด็กสายวิทย์', authors: ['George Orwell','George Orwell'], isbn: '', description: 'Dystopian novel about totalitarianism.'},
        {url: 'https://www.chulabook.com/test-prep/193429', imageUrl: 'https://api.chulabook.com/images/pid-193429.JPG', title: 'To Kill a Mockingbird', authors: ['Harper Lee','Harper Lee'], isbn: '9780061120084', description: 'A novel about racial injustice.'},
        {url: 'https://www.chulabook.com/family-and-children/4678', imageUrl: 'https://api.chulabook.com/images/pid-4678.JPG', title: 'The Catcher in the Rye', authors: ['J.D. Salinger','J.D. Salinger'], isbn: '9780316769174', description: 'A novel about teenage angst.'},
        {url: 'https://www.chulabook.com/test-prep/193431', imageUrl: 'https://1568886761.rsc.cdn77.org/books/24288/Thumbnail/large.gif?', title: 'The Great Gatsby', authors: ['F. Scott Fitzgerald','F. Scott Fitzgerald'], isbn: '9780743273565', description: 'A novel about the American Dream.'},
        {url: 'https://www.chulabook.com/test-prep/193432', imageUrl: 'https://1568886761.rsc.cdn77.org/books/24289/Thumbnail/large.gif?', title: 'The Adventures of Tom Sawyer', authors: ['Mark Twain','Mark Twain'], isbn: '9780486280538', description: 'A novel about a mischievous young boy.'},
        {url: 'https://www.chulabook.com/test-prep/159794', imageUrl: '	https://api.chulabook.com/images/pid-159794.jpg', title: 'The Adventures of Huckleberry Finn', authors: ['Mark Twain','Mark Twain'], isbn: '9780486280613', description: 'A novel about a young boy and his journey down the Mississippi River.'},
        {url: 'https://www.chulabook.com/test-prep/193433', imageUrl: '	https://1568886761.rsc.cdn77.org/books/24290/Thumbnail/large.gif?', title: 'The Little Prince', authors: ['Mark Twain','Mark Twain'], isbn: '9780152023981', description: 'A novel about a young prince and his journey to other planets.'},
        {url: 'https://example.com/books/the-iliad-and-the-odyssey', imageUrl: 'https://example.com/images/the-iliad-and-the-odyssey.jpg', title: 'The Iliad and The Odyssey', authors: ['Mark Twain','Mark Twain'], isbn: '9780684827764', description: 'Two epic poems about the Trojan War.'},
        {url: 'https://example.com/books/the-kite-runner', imageUrl: 'https://example.com/images/the-kite-runner.jpg', title: 'The Kite Runner', authors: ['Mark Twain','Mark Twain'], isbn: '9781570626103', description: 'A novel about the relationship between two childhood friends in Afghanistan.'},
        {url: 'https://example.com/books/the-alchemist', imageUrl: 'https://example.com/images/the-alchemist.jpg', title: 'The Alchemist', authors: ['Mark Twain','Mark Twain'], isbn: '9780061122415', description: 'A novel about a young shepherd and his journey to fulfill his personal legend.'},
        {url: 'https://example.com/books/the-nightingale', imageUrl: 'https://example.com/images/the-nightingale.jpg', title: 'The Nightingale', authors: ['Mark Twain','Mark Twain'], isbn: '9780312577223', description: 'A novel about two sisters and their struggles in France during World War II.'}
    ];

    const handleSearch = () => {
        if (query.trim() === '') {
            alert('กรุณากรอกข้อมูล');
            return;
        }
        setQueryOld(query);
        fetchData(1);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div>
            {isLoading && <Loading />}
            <div className={`${5 <=5 ? 'h-screen' : 'h-full'} w-screen mx-auto p-8 md:p-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} overflow-y-scroll`}>
                <div className="flex items-center mb-4 flex-row justify-between">
                    <h1 className="text-3xl font-bold mb-4">Book Search Engine</h1>
                    <button onClick={toggleDarkMode} className="flex items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                        {darkMode ? <FontAwesomeIcon icon={faMoon} className="w-10 h-10" /> : <FontAwesomeIcon icon={faSun} className="w-10 h-10" />}
                    </button>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={query}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for books..."
                        className="flex-1 px-4 py-2 border rounded-full shadow mr-4"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Search
                    </button>
                </div>
                <div className="flex items-center mb-4 justify-between">
                    <div>
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
                    <div>
                        <label className="mr-4">
                            <input type="number" value={resultsPerPage} onChange={handlePerPageChange} className="mx-2 px-2 py-1 border rounded" />
                            จำนวนหนังสือ / หน้า
                        </label>
                    </div>
                </div>
                <div id="results" className="">
                    จำนวน {((currentPage-1)* resultsPerPage)+1} - {paginatedResults.length+((currentPage-1)* resultsPerPage)+1} / {totalHits} หนังสือ
                    {paginatedResults.map((book, index) => (
                        <div key={index} onClick={() => window.open(`${book.url}`, '_blank')} className={`p-4 rounded shadow ${darkMode ? 'bg-gray-900' : 'bg-white'} cursor-pointer grid grid-cols-4 justify-between shadow hover:bg-gray-200 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} hover:scale-105 transition-all`}>
                            <div className="px-10 py-3">
                            <img src={book.imageUrl} alt={book.title} className="h-90 object-cover mb-2" />
                            </div>
                            <div className="mt-2 col-span-2">
                            <h3 className="text-xl font-bold">                        
                            <Highlighter
                                searchWords={queryOld.split(/(?<!\+)(?<!\-)\s+/).filter(s => s !== '+' && s !== '-')}  // Wrap query in an array
                                textToHighlight={book.title}
                                highlightStyle={{ backgroundColor: 'yellow' }}
                            /></h3>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span className='font-bold'>
                                Author: 
                            </span>                    
                            <Highlighter
                                searchWords={queryOld.split(/(?<!\+)(?<!\-)\s+/).filter(s => s !== '+' && s !== '-')}  // Wrap query in an array
                                textToHighlight={book.authors.join(', ')}
                                highlightStyle={{ backgroundColor: 'yellow' }}
                            />
                            </p>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span className='font-bold'>
                                ISBN:
                            </span> 
                            {book.isbn === "" ? 'N/A' :   
                            <Highlighter
                                searchWords={queryOld.split(/(?<!\+)(?<!\-)\s+/).filter(s => s !== '+' && s !== '-')}  // Wrap query in an array
                                textToHighlight={book.isbn}
                                highlightStyle={{ backgroundColor: 'yellow' }}
                            />}
                            </p>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className='font-bold'>Description: </span> 
                            <Highlighter
                                    searchWords={queryOld.split(/(?<!\+)(?<!\-)\s+/).filter(s => s !== '+' && s !== '-')}  // Wrap query in an array
                                    textToHighlight={book.description}
                                    highlightStyle={{ backgroundColor: 'yellow' }}
                                />
                            </p>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mt-10`}><span className='font-bold'>Url: </span> 
                            <span className='ml-2 underline cursor-pointer hover:text-blue-600'>
                            <Highlighter
                                    searchWords={queryOld.split(/(?<!\+)(?<!\-)\s+/).filter(s => s !== '+' && s !== '-')}  // Wrap query in an array
                                    textToHighlight={book.url}
                                    highlightStyle={{ backgroundColor: 'yellow' }}
                                />
                            </span>
                            </p>
                            </div>
                        </div>
                    ))}
                    {paginatedResults.length === 0 && <p className={`w-full h-full flex items-center justify-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No results found.</p>}
                </div>
                <div className="flex items-center justify-center mt-4">
                    {currentPage > 1 && (
                        <button
                            onClick={handleClick(currentPage - 1)}
                            className="mx-1 px-4 py-2 rounded-full bg-gray-200 text-gray-700"
                        >
                            &lt;
                        </button>
                    )}
                    {[...Array(Math.min(10, Math.ceil(totalHits / pageSize))).keys()].map(page => (
                        <button
                            key={page}
                            onClick={handleClick(page + 1)}
                            className={`mx-1 px-4 py-2 rounded-full ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            disabled={currentPage === Math.ceil(totalHits / pageSize) && page + 1 > Math.ceil(totalHits / pageSize)}
                        >
                            {page + 1}
                        </button>
                    ))}
                    {Math.ceil(totalHits / pageSize) > 10 && (
                        <>
                            <span className="mx-1">...</span>
                            <button
                                onClick={handleClick(Math.ceil(totalHits / pageSize))}
                                className="mx-1 px-4 py-2 rounded-full bg-gray-200 text-gray-700"
                                disabled={currentPage === Math.ceil(totalHits / pageSize)}
                            >
                                {Math.ceil(totalHits / pageSize)}
                            </button>
                        </>
                    )}
                    {currentPage < Math.ceil(totalHits / pageSize) && (
                        <button
                            onClick={handleClick(currentPage + 1)}
                            className="mx-1 px-4 py-2 rounded-full bg-gray-200 text-gray-700"
                            disabled={currentPage + 1 > Math.ceil(totalHits / pageSize)}
                        >
                            &gt;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;