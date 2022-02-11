import { useState, useEffect } from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse'

import EventDate from './EventDate';

import logo from "./media/welcome.jpg";

// import { getData } from './utils/API';
import { formatData } from './utils/formatData';
// const testData = require('./utils/testData.json');
const appData = require('./utils/appData.json');

const App = () => {
  const [wines, setWines] = useState([]);
  const [info, setInfo] = useState(null);
  const [show, setShow] = useState(false);
  const [occasion, setOccasion] = useState(null);

  useEffect(() => {
    getWines();
  }, []);

  const getWines = async () => {
    try {
      // const { data } = await getData();
      const data = appData;
      console.log(data);
      const dataValues = data.valueRanges;
      const wineData = formatData(dataValues[0].values);
      console.log(wineData);
      // const memberData = formatData(dataValues[1].values);
      // console.log(memberData);
      setWines(wineData);
    } catch (err) {
      console.log(err);
    }
  }

  const handleInfo = (e, wine) => {
    if (info === wine) {
      setInfo(null);
    } else {
      setInfo(wine);
    }
  }

  const handleHide = () => setShow(false);

  const handleShow = (e, occasion) => {
    const occasionDate = wines.filter(item => {
      return item.date === occasion;
    });
    console.log(occasionDate);
    setOccasion(occasionDate);
    setShow(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src={logo} alt="De Wijn Klub Logo" />
        {/* <h1>De Wijn Club</h1> */}
      </header>
      <container>
        <div className="section">
          {wines.map((wine) => {
            return (
              <div key={wine.id} className="wineCard">
                <h2>{wine.wine}</h2>
                <h3>{wine.country}</h3>
                <img className="wine-img" src={process.env.PUBLIC_URL + `images/${wine.id}.jpg`} alt="wine image" />
                <Button
                  onClick={(e) => handleInfo(e, wine.id)}
                  aria-controls="example-collapse-text"
                  aria-expanded={info}
                >
                  {info === wine.id ? "Less info" : "More info"}
                </Button>
                <Collapse in={info === wine.id ? true : false}>
                  <div id="example-collapse-text">
                    <p><strong>{wine.owner}</strong></p>
                    <p>Date: <a onClick={(e) => handleShow(e, wine.date)}>{wine.date}</a></p>
                    <table className="wine-stats">
                      <tbody>
                        <tr>
                          <td>Ranked</td>
                          <td>{wine.position}</td>
                        </tr>
                        <tr>
                          <td>Tasting order</td>
                          <td>{wine.tasting_order}</td>
                        </tr>
                        <tr>
                          <td>Average score /20</td>
                          <td>{wine.average_score}</td>
                        </tr>
                      </tbody>
                    </table>
                    <p><strong>Who's favourite was it:</strong><br />{wine.favourite}</p>
                    <p><strong>Who gave it their lowest score:</strong><br />{wine.worst}</p>
                  </div>
                </Collapse>
              </div>
            )
          })}
        </div>
        <EventDate eventWines={occasion} show={show} handleHide={handleHide} />
      </container>
      <footer>
        <p>De Wijn Klub - Drink wine, be happy</p>
      </footer>
    </div>
  );
}

export default App;
