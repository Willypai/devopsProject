import React, { useState, useEffect } from "react";
import axios from "axios";

type PNGLogo = string & { _pngBrand: never };

interface Team {
  nickname: string;
  code: string;
  logo: string | null;
  logoPNG: PNGLogo | null;
}
interface Score {
  linescore: string[];
  points: string;
}
interface Game {
  teams: {
    visitors: Team;
    home: Team;
  };
  scores: {
    visitors: Score;
    home: Score;
  };
}

const NBAComponent: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const currentDate = new Date();
  const formattedToday = currentDate.toISOString().slice(0, 10); // Get today's date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-nba-v1.p.rapidapi.com/games",
          {
            params: {
              date: formattedToday, // Use today's date
            },
            headers: {
              "X-RapidAPI-Key":
                "27244be62dmshb2410b2c636a6a7p18e011jsn345988bae2b4",
              "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
            },
          }
        );
        setGames(response.data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formattedToday]);

  return (
    <div className="container">
      <h1 className="text-center mb-4">NBA Games</h1>
      {games.map((game, index) => (
        <div key={index} className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Game {index + 1}</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <h2>Home&nbsp;&nbsp;</h2>
                  {game.teams.home.logo && (
                    <div className="d-flex align-items-center">
                      {game.scores.home.points > game.scores.visitors.points ? (
                        <h2
                          className="text-success mr-2"
                          style={{ color: "#BBFFBB" }}
                        >
                          "W"&nbsp;
                        </h2>
                      ) : (
                        <h2 className="text-danger mr-2">"L"&nbsp;</h2>
                      )}
                      <img
                        src={game.teams.home.logo}
                        alt="Home Logo"
                        style={{
                          maxWidth: "180px",
                          maxHeight: "180px",
                          marginRight: "30px",
                          position: "relative",
                        }}
                      />
                    </div>
                  )}
                  <ul className="list-group">
                    <li className="list-group-item">
                      Name: {game.teams.home.nickname}
                    </li>
                    <li className="list-group-item">
                      Code: {game.teams.home.code}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      linescore: [{game.scores.home.linescore.join(", ")}]
                    </li>
                    <li className="list-group-item">
                      points: {game.scores.home.points}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <h2>Visitors&nbsp;&nbsp;</h2>
                  {game.teams.visitors.logo && (
                    <div className="d-flex align-items-center">
                      {game.scores.visitors.points > game.scores.home.points ? (
                        <h2
                          className="text-success mr-2"
                          style={{ color: "#BBFFBB" }}
                        >
                          "W"&nbsp;
                        </h2>
                      ) : (
                        <h2 className="text-danger mr-2">"L"&nbsp;</h2>
                      )}
                      <img
                        src={game.teams.visitors.logo}
                        alt="Visitors Logo"
                        style={{
                          maxWidth: "180px",
                          maxHeight: "180px",
                          marginRight: "30px",
                          position: "relative",
                        }}
                      />
                    </div>
                  )}
                  <ul className="list-group">
                    <li className="list-group-item">
                      Name: {game.teams.visitors.nickname}
                    </li>
                    <li className="list-group-item">
                      Code: {game.teams.visitors.code}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      linescore: [{game.scores.home.linescore.join(", ")}]
                    </li>
                    <li className="list-group-item">
                      points: {game.scores.visitors.points}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NBAComponent;