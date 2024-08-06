import React, { useState } from 'react'
import { FaBook } from "react-icons/fa6";
import { IoPlayCircle } from "react-icons/io5";

export  function Dictionary() {
    const [word, setWord] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

     const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      const result = await response.json();
      setData(result[0]);
      setError(null);
    } catch (err) {
      setData(null);
      setError(err.message);
    }
  };

  return (
    <div className='main-dictionary-container'>
        <header>
            <FaBook className='logo' />
        </header>
        <main>
            <div class="input-group">
                <input type="text" className="input" onChange={(e) => setWord(e.target.value)} value={word} placeholder="Search word"  />
                <input class="button--submit" value="Search" type="submit"  onClick={handleSearch}/>
            </div>
            {data && (
                <>
                 <div className='word'>
                <div>
                    <p>{data.word}</p>
                    <p>{data.phonetics.map(phonetic => (
                        phonetic.text
                    ))}</p>
                </div>
                <div>
                    <IoPlayCircle className='play-btn' />
                </div>
            </div>
            <div className='noun-container'>
                <div>
                    {data.meanings.map((meaning, index) => (
                        <div key={index}>
                            <div className='title'>
                                <h2>{meaning.partOfSpeech}</h2>
                                <hr />
                            </div>
                                <ul>
                                {meaning.definitions.map((def, idx) => (
                                        <li key={idx}>
                                            <p><strong>Definition:</strong> {def.definition}</p>
                                            <p><strong>Example:</strong> {def.example}</p>
                                        </li>
                                ))}
                                </ul>
                        </div>
                    ))}
                </div>
            </div>
            </>
            )}
        </main>
    </div>
  )
}
