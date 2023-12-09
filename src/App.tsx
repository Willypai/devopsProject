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
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  const formattedYesterday = yesterday.toISOString().slice(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-nba-v1.p.rapidapi.com/games",
          {
            params: {
              date: formattedYesterday, // 今天的日期
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
  }, []);

  return (
    <div>
      <h1>NBA Games</h1>
      <div>
        {games.map((game, index) => (
          <div key={index}>
            <h2>Game {index + 1}</h2>
            <div>
              <h3>Home</h3>
              {/* 使用<img>标签显示图片 */}
              {game.teams.home.logo && (
                <img
                  src={game.teams.home.logo}
                  alt="Home Logo"
                  style={{
                    maxWidth: 200,
                    maxHeight: 200,
                    width: "auto",
                    height: "auto",
                  }}
                />
              )}
              <p>Name: {game.teams.home.nickname}</p>
              <p>Code: {game.teams.home.code}</p>
              <p>linescore :[{game.scores.home.linescore.join(",")}]</p>
              <p>points: {game.scores.home.points}</p>
            </div>
            <div>
              <h3>Visitors</h3>
              {/* 使用<img>标签显示图片 */}
              {game.teams.visitors.logo && (
                <img
                  src={game.teams.visitors.logo}
                  alt="Home Logo"
                  style={{
                    maxWidth: 200,
                    maxHeight: 200,
                    width: "auto",
                    height: "auto",
                  }}
                />
              )}
              <p>Name: {game.teams.visitors.nickname}</p>
              <p>Code: {game.teams.visitors.code}</p>
              <p>linescore :[{game.scores.visitors.linescore.join(",")}]</p>
              <p>points: {game.scores.visitors.points}</p>
            </div>
            {/* 更多游戏信息... */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NBAComponent;
