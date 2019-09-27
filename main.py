#! /bin/bash/python3

import requests 
from bs4 import BeautifulSoup

import mysql.connector

mydb = mysql.connector.connect (
	host = "127.0.0.1",
	user = "robbie",
	passwd = "WildcatIsland16",
	db = "fantasy_hockey"
	)

cursor = mydb.cursor()
 
query = ("SELECT * FROM my_team")

cursor.execute(query)

for x in cursor:
	print(x)

cursor.close()
mydb.close()

### ROSTER FUNCTION ###

def roster ():
	
	# getting projected stats for my team
	url = "https://hockey.fantasysports.yahoo.com/hockey/3872/10"
	response = requests.get(url)
	content = BeautifulSoup(response.content, "html.parser")

	tag = ["a", "td"]

	scrape = ["name", "Ta-end"]

	data = []
	
	for stats in content.find_all(tag, {"class" : scrape}):
		data.append(stats.text)

	for x in data:
		if len(x) > 4:
			print('\n',x, end="	")
		else: print(x, end="	")

### print(roster())

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
			print('\n',x , end="	")
		else: print(x, end="	")

### print(skaters())


### Goalies ###

def goalies():

	#url path, request and parser

	url = "https://www.hockey-reference.com/leagues/NHL_2019_goalies.html"
	response = requests.get(url)
	content = BeautifulSoup(response.content, "html.parser")

	#player, gp, w, sv, sa, sv_pct, sho

	scrape = ["player", "games_goalie", "wins_goalie", "saves", "shots_against", "save_pct", "shutouts"]


	data = []

	#loops over scrape list and appends all data to the players list
	for stats in content.find_all("td", {"data-stat": scrape}):
		data.append(stats.text)
	#loops over all data in players list and formats for importing into SQL table
	for x in data:
		if len(x) > 4:
			print("\n",x , end="	")
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

	#finds all players that have been marked as keeper
	for stats in content.find_all("a", {"class": "name"}):
		data.append(stats.text)

	for x in data:
		print('',x)

### print(keepers())


### Draft Strategy ###

# calculated amount of stats in each category to win category

# Example #

# g : 410
# a : 720
# p : 1,100
#ppg : 100 

# determine what combination of players is necessary to reach these benchmarks
# using draft position and average draft pick, compile a "most likely" team

### Compile all data and give overall score ###

#create a scoring system,
# 0 = worst
# 100 = best

### Create drafting strategy ###

#few good players at position

#Roster
#C = 4
#LW = 4
#RW = 4
#D = 6
#G = 2
#Skaters Bench = 8
#Goalies Bench = 2
#Total = 30

#in an 10 team league, this means the top 300 players will be drafted. In theory. 


### Generate draft ranked draft list ###

### Export into easy to read doc ###



