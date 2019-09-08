#! /bin/bash/python3

import requests 
from bs4 import BeautifulSoup

#ultimate goal is to have a list of players with
#a high probability of being drafted that will 
#produce the most

#url path, request and parser

url = "https://www.hockey-reference.com/leagues/NHL_2019_skaters.html"
response = requests.get(url)
content = BeautifulSoup(response.content, "html.parser")

### Data that needs scraped ###

#Skaters
#g, a, p, pim, ppg, ppa, ppp, sog, fw, hit, blk

skater_stats = []

stats_to_scrape = ["pos", "games_played", "goals", "assists", "points", "pen_min", "goals_pp", "assists_pp", "shots", "blocks", "faceoff_wins", "hits"]

#create a dictionary of each player whose value is a list of their stats

players = { }

for player in content.find_all("td", {"data-stat": "player"}): 
	players.update({player.text: []})

#append values with players stats


for x in stats_to_scrape:
	for data_stat in content.find_all("td", {"data-stat": x}):
		skater_stats.append(data_stat.text)
		break

print(players)

# 1 year stats

# 2 year stats

# 3 year stats

# 4 year stats

# 5 year stats


#Goalies
#w, sv, sa, sv%, sho

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



