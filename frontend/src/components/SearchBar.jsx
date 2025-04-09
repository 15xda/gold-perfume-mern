import React, {useRef, useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const searchRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const searchTerm = searchRef.current.value.trim();
        
        if (!searchTerm) return; 

        const newParams = new URLSearchParams(searchParams);
        newParams.set("term", searchTerm);

        setSearchParams(newParams);
        navigate(`/search?${newParams}`);
    };

    return (
        <div className='search-container'>
            <form onSubmit={handleSearch}>
                <input 
                    ref={searchRef} 
                    placeholder='Поиск по каталогу' 
                    type="text"
                    defaultValue={searchParams.get('term') || ''}
                />
                <button type="submit" onClick={handleSearch} className='search-button'>
                    <span className="material-icons">search</span>
                </button>
            </form>
        </div>
    );
};

export default SearchBar