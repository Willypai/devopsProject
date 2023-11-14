from nba_api import NBAApi

def main():
    nba_api = NBAApi()
    live_scores_data = nba_api.get_live_scores()

    if live_scores_data:
        games = live_scores_data['resultSets'][0]['rowSet']
        print("NBA Live Scores:")
        for game in games:
            print(f"{game[5]} vs {game[6]} - {game[7]}")

if __name__ == "__main__":
    main()
