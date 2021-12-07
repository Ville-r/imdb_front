import { useState } from 'react'
import axios from 'axios';
// URL-osoite tietokantayhteyden luontiin
const URL = 'http://localhost/imdb_back/'
// funktioissa tarvittavat muuttujat.
function App() {
  const [batmans, setBatmans] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(null);
  const [isLoaded1, setIsLoaded1] = useState(null);
// Batman nimikkeiden hakuun tarvittava funktio
  function findBatman(e) {
    e.preventDefault();
    setIsLoaded(false);
    axios
      .get(URL + 'batman.php')
      .then(response => {
        setBatmans(response.data)
        setIsLoaded(true)
      })
      .catch(error => {
        alert(error)
      })
  }
// lyhyiden leffojen hakuun tarvittava funktio
  function findShort(e) {
    e.preventDefault();
    setIsLoaded1(false);
    axios
      .get(URL + 'short.php')
      .then(response => {
        setShorts(response.data)
        setIsLoaded1(true)
      })
      .catch(error => {
        alert(error)
      })
  }

// renderöinti. Buttonit, joilla funktioita kutsutaan. Tulokset mapataan esille li-elementteihin.
  return (
    <div className='container-fluid'>
      <h1>New features in IMDB!</h1>
      <div className="row">
        <div className="col-6">
          <br />
          <button onClick={findBatman} >Click here to find the top ten Batman titles!</button>
          <br />
          <ol>
            {isLoaded === false ? (
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              (batmans?.map(title => (
                <li key={title.title_id}>
                  <b><p>{title.primary_title}</p></b>
                  <p>Year: {title.start_year}</p>
                  <p>Rating: {title.average_rating}</p>
                </li>
              )))
            )}
          </ol>
        </div>
        <div className="col-6">
          <br />
          <button onClick={findShort} >Click here to find the shortest comedy movies published in Finland!</button>
          <br />
          <ol>
            {isLoaded1 === false ? (
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              (shorts?.map(title => (
                <li key={title.title_id}>
                  <b><p>{title.primary_title}</p></b>
                  <p>Year: {title.start_year}</p>
                  <p>Lenght: {title.runtime_minutes} minutes</p>

                </li>
              )))
            )}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App
