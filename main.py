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

# 1 year stats

# 2 year stats

# 3 year stats

# 4 year stats

# 5 year stats

skater_stats = []

stats_to_scrape = ["player", "pos", "games_played", "goals", "assists", "points", "pen_min", "goals_pp", "assists_pp", "shots", "blocks", "faceoff_wins", "hits"]

### EXAMPLE START ###
#
# skaters_master_lsit = {"skaters : [
#  {Patrick Kane : [
# 	{ goals : 
#	  assist :
#	  ppg :
#		}
#	 ]
#  }
#
#  {Brandon Saad : [
#	{ goals: 
#         assist :
#	  ppg :
#		}
#	 ]
#  }]
# }
#
### EXAMPLE END ###

#create a dictionary with skaters as key and an empty list for value
skaters_master = {"skaters":[]}
	
def add_skaters():
	#for loop scraping skater names
	for skater_name in content.find_all("td", {"data-stat": "player"}):
		#add player name to skater value list as new dictionary 
		skater_access = skaters_master["skaters"]
		skater_access.append({skater_name.text: []})

def add_stat_categories():
	#for loop scraping stat cetegories
	skater_access = skaters_master["skaters"]
	stat_category_acesss = skater_access[]
	for stat in stat_category_access:
		



#create a new dictionay associated with each skater name

	
#for loop scraping skater stats
	#for skater_stats in content.find_all("td", {"data-stat": "goals"}):
		 
		#skater_access = skaters_master_list["skaters"]
		#skater_access.append(skater_name.text)

print(skaters_master)


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



