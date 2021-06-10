import { Link, useHistory } from "react-router-dom"
import { useState } from 'react';
import * as winesAPI from "../../utilities/wines-api";


export default function HomePage({ setWine, wineTitles }) {
  const [search, setSearch] = useState({ title: '' });
  const history = useHistory();
  // state for autocomplete feature
  const [display, setDisplay] = useState(false);

  
  function handleChange(evt) {
    setSearch({[evt.target.name]: evt.target.value});
  }

  async function handleSubmit() {
    const wine = await winesAPI.search(search);
    // If there is a wine of that name, then go to results page
    if (wine) {
      setWine(wine);
      history.push('/results');
    } else {
      // inform user there is no wine by that name
    }
  }

  // Helper Functions
  function setSearchedWine(wine) {
    setSearch(wine);
    setDisplay(false);
  }

  return (
    <>
      <h1>HOMEPAGE</h1>
      <div className="dropdown is-active">
        <div className="dropdown-trigger">
          <input 
          type="text" 
          name="title" 
          onChange={handleChange} 
          onClick={() => setDisplay(!display)} 
          value={search.title} 
          required
          />
        </div>
        <div className="dropdown-menu">
          { display && (
            <div className="dropdown-content">
              { wineTitles
                .filter(({ title }) => title.toLowerCase().includes(search.title.toLowerCase()))
                .map((wine, idx) => {
                    return(
                      <div key={idx}>
                        <div className="dropdown-item" onClick={() => setSearchedWine(wine)}>{ wine.title }</div>
                        <hr className="dropdown-divider" />
                      </div>
                    )
                  }) 
                }
            </div>
                ) }
        </div>
      </div>
      <button onClick={handleSubmit}> Submit </button>
      <br/>
      <Link to="/results">
        <button>TEST</button>
      </Link>
    </>
  );
}