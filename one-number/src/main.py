#! /bin/bash/python3

import requests
import json
from bs4 import BeautifulSoup

### POSITIONS TO SCRAPE
skaterStats = ["player", "pos", "games_played", "goals", "assists", "points", "pen_min", "goals_pp", "assists_pp", "shots", "blocks", 	"hits", "faceoff_wins"]

goalieStats = ["player", "starts_goalie", "wins_goalie", "goals_against", "saves", "save_pct", "shutouts"]

### URLS FOR DATA SCRAPE
skaterURL = "https://www.hockey-reference.com/leagues/NHL_2020_skaters.html"
goalieURL = "https://www.hockey-reference.com/leagues/NHL_2020_goalies.html"

## LISTS FOR STORING SCRAPED DATA
skaterData = []
goalieData = []


###############################
### CREATE SKATERS DATABASE ###
###############################

def scrape (url, stats, data):

	### BEAUTIFUL SOUP SETUP
	response = requests.get(url)
	content = BeautifulSoup(response.content, "html.parser")

	### TD ELEMENTS WITH A TAG OF 'DATA-STAT': LIST
	scrapedData = content.find_all("td", {"data-stat": stats})

	### LOOPING OVER DATA TO WRITE TO TXT FILE
	for i in scrapedData:
		# replacing spaces in name with underscore
		data.append(i.text.replace(" ", "_"))



###########################
# WRITE DATA TO TEXT FILE #
###########################

### FILES TO WRITE TO
skaterFile = open('./data/skater.txt', 'w')
goalieFile = open('./data/goalie.txt', 'w')

def dataToTxt(data, file):
	for stat in data:
		if len(stat) > 4:
			file.write("\n")
			file.write(stat)
			file.write(',')
		else:
			file.write(stat)
			file.write(',')



##############################
# REMOVING DUPLICATE ENTRIES #
##############################

skaterOutfile =  open('./data/skaterDB.txt', "w")
skaterInfile = open('./data/skater.txt', "r")

goalieOutfile =  open('./data/goalieDB.txt', "w")
goalieInfile = open('./data/goalie.txt', "r")


def removeDups(infile, outfile):

	namesSeen = set()

	for line in infile:
		name = list(line.strip().split(",", 14))[0]
		print(name)
		if name not in namesSeen:
			outfile.write(line)
			namesSeen.add(name)
	outfile.close()


scrape(skaterURL, skaterStats, skaterData)
dataToTxt(skaterData, skaterFile)
removeDups(skaterInfile, skaterOutfile)

###############################
# CONVERTING TEXT DOC TO JSON #
###############################


	# skatersTxt = './data/skatersDB.txt'
	# dict1 = {}
	# fields = ['Pos','GP','G','A','P','PM','PPG','PPA','S','BLK','H','FW']
	#
	# with open(skatersTxt) as skatersDoc:
	# 	for line in skatersDoc:
	# 		name = list( line.strip().split(",", 14))[0]
	# 		description = list(line.strip().split(",", 13))
	#
	# 		if (len(description) > 10):
	# 			i = 0
	# 			dict2 = {}
	# 			while i < len(fields):
	# 				dict2[fields[i]] = description[i+1]
	# 				i = i + 1
	# 				dict1[name] = dict2
	#
	# out_file = open("./data/skaters.json", "w")
	# json.dump(dict1, out_file, indent = 4)
	# out_file.close()
