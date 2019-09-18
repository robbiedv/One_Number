#! /bin/bash/python3

import requests 
from bs4 import BeautifulSoup

#ultimate goal is to have a list of players with
#a high probability of being drafted that will 
#produce the most

### Skaters ###

def skaters ():

	#url path, request and parser

	skater_url = "https://www.hockey-reference.com/leagues/NHL_2019_skaters.html"
	response = requests.get(skater_url)
	content = BeautifulSoup(response.content, "html.parser")

	#player, pos, gp, g, a, pim, ppg, ppa, sog, blk, hit, fw

	skater_scrape = ["player", "pos", "games_played", "goals", "assists", "points", "pen_min", "goals_pp", "assists_pp", "shots", "blocks", 	"hits", "faceoff_wins"]


	skaters = []


	for stats in content.find_all("td", {"data-stat": skater_scrape}):
		skaters.append(stats.text)

	for x in skaters:
		if len(x) > 4:
			print('\n', x , end="	")
		else: print(x, end="	")



### Goalies ###

def goalies():

	#url path, request and parser

	goalie_url = "https://www.hockey-reference.com/leagues/NHL_2019_goalies.html"
	response = requests.get(goalie_url)
	content = BeautifulSoup(response.content, "html.parser")

	#player, gp, w, sv, sa, sv%, sho

	goalie_scrape = ["player", "games_goalie", "wins_goalie", "saves", "shots_against", "save_pct", "shutouts"]


	goalies = []


	for stats in content.find_all("td", {"data-stat": goalie_scrape}):
		goalies.append(stats.text)

	for x in goalies:
		if len(x) > 4:
			print('\n', x , end="	")
		else: print(x, end="	")

print(goalies())


### Data that needs ranked and scored individually ###

#5 year stats, 0 - 100

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



