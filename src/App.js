import { useState, useEffect } from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import MoreInfo from './MoreInfo';

import logo from "./media/welcome.jpg";

// import { getData } from './utils/API';
import { formatData } from './utils/formatData';
const appData = require('./utils/appData.json');

const App = () => {
  const [wines, setWines] = useState([]);
  const [initWines, setInitWines] = useState([]);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(null);
  const [occasion, setOccasion] = useState(null);

  useEffect(() => {
    getWines();
  }, []);

  const getWines = async () => {
    try {
      // const { data } = await getData();
      const data = appData;
      // console.log(data);
      const dataValues = data.valueRanges;
      const wineData = formatData(dataValues[0].values);
      // console.log(wineData);
      // const memberData = formatData(dataValues[1].values);
      // console.log(memberData);
      setInitWines(wineData);
      setWines(wineData);
    } catch (err) {
      console.log(err);
    }
  }

  const handleHide = () => setShow(false);

  const handleShow = (e, wine) => {
    const occasionDate = wine.date;
    const occasionWines = wines.filter(item => {
      return item.date === occasionDate;
    });
    setInfo(wine);
    setOccasion(occasionWines);
    setShow(true);
  }

  const handleFilter = (eventKey) => {
    let filteredWines;
    if (eventKey === "winners") {
      filteredWines = initWines.filter((item) => {
        return item.position === "1";
      });
    } else {
      filteredWines = initWines.filter((item) => {
        return item.date === eventKey;
      });
    }
    setWines(filteredWines);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src={logo} alt="De Wijn Klub Logo" />
      </header>
      <Navbar sticky="top" bg="light" className="justify-content-center">
        <Nav onSelect={handleFilter}>
          <Nav.Item>
            <Nav.Link eventKey="winners">Winning wines</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Events" id="nav-dropdown">
            <NavDropdown.Item eventKey="2021-09-11">September 2021</NavDropdown.Item>
            <NavDropdown.Item eventKey="2022-02-05">February 2022</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <container>
        <div className="section">
          {wines.map((wine) => {
            return (
              <div key={wine.id} className="wineCard">
                <h2>{wine.wine}</h2>
                <h3>{wine.country}</h3>
                <img className="wine-img" src={process.env.PUBLIC_URL + `images/${wine.id}.jpg`} alt="wine image" />
                <Button onClick={(e) => handleShow(e, wine)}>More info</Button>
              </div>
            )
          })}
        </div>
        <MoreInfo wineInfo={info} eventWines={occasion} show={show} handleHide={handleHide} />
      </container>
      <footer>
        <p>De Wijn Klub - Drink wine, be happy</p>
      </footer>
    </div>
  );
}

export default App;
