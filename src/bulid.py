import requests

url = "https://api-nba-v1.p.rapidapi.com/games"

querystring = {"date":"2023-11-21"}

headers = {
	"X-RapidAPI-Key": "27244be62dmshb2410b2c636a6a7p18e011jsn345988bae2b4",
	"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())