#! /bin/bash/python3

import requests 
from bs4 import BeautifulSoup

#ultimate goal is to have a list of players with
#a high probability of being drafted that will 
#produce the most

### Skaters ###

def skaters ():

	#url path, request and parser

	url = "https://www.hockey-reference.com/leagues/NHL_2019_skaters.html"
	response = requests.get(url)
	content = BeautifulSoup(response.content, "html.parser")

	#player, pos, gp, g, a, pim, ppg, ppa, sog, blk, hit, fw

	scrape = ["player", "pos", "games_played", "goals", "assists", "points", "pen_min", "goals_pp", "assists_pp", "shots", "blocks", 	"hits", "faceoff_wins"]


	data = []

	#loops over scrape list and appends all data to the players list
	for stats in content.find_all("td", {"data-stat": scrape}):
		data.append(stats.text)
	#loops over all data in players list and formats for importing into SQL table
	for x in data:
		if len(x) > 4:
			print('\n', x , end="	")
		else: print(x, end="	")

### print(skaters())


### Goalies ###

def goalies():

	#url path, request and parser

	url = "https://www.hockey-reference.com/leagues/NHL_2019_goalies.html"
	response = requests.get(url)
	content = BeautifulSoup(response.content, "html.parser")

	#player, gp, w, sv, sa, sv%, sho

	scrape = ["player", "games_goalie", "wins_goalie", "saves", "shots_against", "save_pct", "shutouts"]


	data = []

	#loops over scrape list and appends all data to the players list
	for stats in content.find_all("td", {"data-stat": scrape}):
		data.append(stats.text)
	#loops over all data in players list and formats for importing into SQL table
	for x in data:
		if len(x) > 4:
			print('\n', x , end="	")
		else: print(x, end="	")

### print(goalies())


### Keeper League Options ###

def keepers(): 

	#url path, request and parser
	#url is specific to league, must be manually entered

	url = "https://hockey.fantasysports.yahoo.com/hockey/3872/startingrosters"
	response = requests.get(url)
	content = BeautifulSoup(response.content, "html.parser")

	data = []

	#finds all palyers that have been marked as keeper
	for stats in content.find_all("a", {"class": "name"}):
		data.append(stats.text)

	for x in data:
		print(x)

print(keepers())
	

#<a class="Nowrap name F-link" href="https://sports.yahoo.com/nhl/players/6743" target="_blank" id="yui_3_18_1_1_1568845890376_2242">Connor #McDavid</a> <span class="Fz-xxs" id="yui_3_18_1_1_1568845890376_2241">Edm - C</span> <span class="F-icon Fz-xs Cur-p" title="This player is a #keeper." id="yui_3_18_1_1_1568845890376_2227"></span>


### Data that needs ranked and scored individually ###

#1 year stats, 0 - 100

#trends, 0 - 100

#prediction (takes into account trades etc. use NHL) 0 - 100

#draftability (based on mock drafts) 0 - 100


### Compile all data and give overall score ###

#create a scoring system,
# 0 = worst
# 100 = best

### Create drafting strategy ###

#few good players at position

#roster slots
#C = 4
#LW = 4
#RW = 4
#D = 6
#G = 2

### Generate draft ranked draft list ###

### Export into easy to read doc ###



