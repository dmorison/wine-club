import { useState, useEffect } from 'react';
import './App.css';

// import { getData } from './utils/API';
import { formatData } from './utils/formatData';
const testData = require('./utils/testData.json');

const App = () => {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    getWines();
  }, []);

  const getWines = async () => {
    try {
      // const { data } = await getData();
      const data = testData;
      console.log(data);
      const dataValues = data.valueRanges;
      const wineData = formatData(dataValues[0].values);
      console.log(wineData);
      const memberData = formatData(dataValues[1].values);
      console.log(memberData);
      setWines(wineData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>De Wijn Club</h1>
      </header>
      <container>
        <div className="section">
          {wines.map((wine) => {
            return (
              <div key={wine.id} className="wineCard">
                <h2>{wine.wine}</h2>
                <img className="wine-img" src={process.env.PUBLIC_URL + `images/${wine.id}.jpg`} alt="wine image" />
                <p><strong>{wine.owner}</strong></p>
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
                      <td>Total score</td>
                      <td>{wine.total_score}</td>
                    </tr>
                  </tbody>
                </table>
                <p><strong>Who's favourite was it:</strong><br />{wine.favourite}</p>
                <p><strong>Who gave it their lowest score:</strong><br />{wine.worst}</p>
              </div>
            )
          })}
        </div>
      </container>
    </div>
  );
}

export default App;
