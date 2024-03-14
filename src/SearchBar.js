import { useState } from 'react';

function SearchBar({ handleSearch }) {
    const [textInput, setInput] = useState('');

    return (
        <div className="SearchBar">
            <input 
                type="text"
                value={textInput}
                onChange={(e) => setInput(e.target.value)}>
            </input>
            <button onClick={() => handleSearch(textInput)}>Find Player</button>
        </div>
    );
}

export default SearchBar;