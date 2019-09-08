#! /bin/bash/python3

import requests 
from bs4 import BeautifulSoup

#ultimate goal is to have a list of players with
#a high probability of being drafted that will 
#produce the most

### Data that needs scraped ###

#skater_stats = 'http://www.nhl.com/stats/player?aggregate=1&reportType=season&seasonFrom=20142015&seasonTo=20182019&gameType=2&filter=gamesPlayed,gte,1&sort=points,goals,assists'
#response = requests.get(skater_stats)
#content = BeautifulSoup(response.content, "html.parser")

#test = content.find_all(attrs={"class": "rt-header-cell"})

#print(test.get_text())

url = "https://www.hockey-reference.com/leagues/NHL_2019_skaters.html"

response = requests.get(url)
content = BeautifulSoup(response.content, "html.parser")

player_stats = [ ]

stats_to_scrape = ["player", "pos", "games_played", "goals", "assists", "points", "pen_min", "goals_pp", "assists_pp", "shots", "blocks", "faceoff_wins", "hits"]

for x in stats_to_scrape:
	stat = content.find("td", {"data-stat": x})
	player_stats.append(stat.text)


def name():
	stat = content.find("td", {"data-stat": "player"})
	player_stats.append(stat.text)

print(player_stats)

# 1 year stats

# 2 year stats

# 3 year stats

# 4 year stats

# 5 year stats

#Skaters
#g, a, p, pim, ppg, ppa, ppp, sog, fw, hit, blk


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



