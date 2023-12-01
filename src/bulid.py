import requests
from datetime import date
import pandas as pd


url = "https://api-nba-v1.p.rapidapi.com/games"

querystring = {"date":str(date.today())}


headers = {
	"X-RapidAPI-Key": "27244be62dmshb2410b2c636a6a7p18e011jsn345988bae2b4",
	"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

data = response.json()

result_count = data["results"]

details = data["response"]

detail_date = []
detail_arena= []
detail_teams = []
detail_scores = []
detail_officials = []

for i in range(result_count):
	# detail_date = details[i]["date"]
	# detail_arena = details[i]["arena"]
	detail_teams = details[i]["teams"]
	detail_scores = details[i]["scores"]
	# detail_officials = details[i]["officials"]
	teams = pd.DataFrame(detail_teams)
	team_final = teams.drop("id").drop("name").drop("logo")
	# print(team_final)
	scores = pd.DataFrame(detail_scores)
	scores_final = scores.drop("win").drop("loss").drop("series")
	game =  pd.concat([team_final, scores_final], axis=0) 
	print(game)


# detail_teams_visitors_name = details[0]["teams"]["visitors"]["name"]
# detail_teams_visitors_code = details[0]["teams"]["visitors"]["code"]

# print(detail_teams)

#table=  pd.DataFrame(detail)

#print(table)