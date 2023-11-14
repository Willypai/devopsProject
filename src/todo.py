import requests

class NBAApi:
    def __init__(self):
        self.base_url = "https://stats.nba.com/stats"

    def get_live_scores(self):
        endpoint = "/scoreboardV2"
        params = {
            "gameDate": "today",
            "leagueId": "00",
            "dayOffset": "0",
        }

        url = f"{self.base_url}{endpoint}"
        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"Error: {response.status_code}")
            return None
