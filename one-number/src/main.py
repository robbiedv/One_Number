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

### FILES TO WRITE TO
skaterFile = open('./data/skater.txt', 'w')
goalieFile = open('./data/goalie.txt', 'w')

## LISTS FOR STORING SCRAPED DATA
skaterData = []
goalieData = []


###########################
# CREATE SKATERS DATABASE #
###########################

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

def dataToTxt(data, file):
	for stat in data:
		if len(stat) > 4:
			file.write("\n")
			file.write(stat)
			file.write(',')
		else:
			file.write(stat)
			file.write(',')
	file.close()


##############################
# REMOVING DUPLICATE ENTRIES #
##############################

def removeDups(test):

	if (test == "goalie"):
		outfile = open('./data/goalieDB.txt', "w")
		infile = open('./data/goalie.txt', "r")
		namesSeen = set()
		for line in infile:
			name = list(line.strip().split(",", 8))[0]
			if name not in namesSeen:
				outfile.write(line)
				namesSeen.add(name)
		outfile.close()

	elif (test == "skater"):
		outfile = open('./data/skaterDB.txt', "w")
		infile = open('./data/skater.txt', "r")
		namesSeen = set()
		for line in infile:
			name = list(line.strip().split(",", 14))[0]
			if name not in namesSeen:
				outfile.write(line)
				namesSeen.add(name)
		outfile.close()


###############################
# CONVERTING TEXT DOC TO JSON #
###############################

skaterKeys = ['Pos','GP','G','A','P','PM','PPG','PPA','S','BLK','H','FW']
goalieKeys = ['GS', 'W', 'GA', 'SV', 'SV%', 'SH']

def dataToJSON(keys, test):

	dict1 = {}

	if (test == "skater"):
		with open('./data/skaterDB.txt') as txtFile:
			for line in txtFile:
				name = list( line.strip().split(",", 14))[0]
				stats = list(line.strip().split(",", 13))

				if (len(stats) > 10):
					i = 0
					dict2 = {}
					while i < len(keys):
						dict2[keys[i]] = stats[i+1]
						i = i + 1
						dict1[name] = dict2

		outfile = open("./data/skaters.json", "w")
		json.dump(dict1, outfile, indent = 4)
		outfile.close()

	if (test == "goalie"):
		with open('./data/goalieDB.txt') as txtFile:
			for line in txtFile:
				name = list( line.strip().split(",", 8))[0]
				stats = list(line.strip().split(",", 7))

				if (len(stats) > 5):
					i = 0
					dict2 = {}
					while i < len(keys):
						dict2[keys[i]] = stats[i+1]
						i = i + 1
						dict1[name] = dict2
		out_file = open("./data/goalies.json", "w")
		json.dump(dict1, out_file, indent = 4)
		out_file.close()


def skaters():
	scrape(skaterURL, skaterStats, skaterData)
	dataToTxt(skaterData, skaterFile)
	removeDups("skater")
	dataToJSON(skaterKeys, "skater")

def goalies():
	scrape(goalieURL, goalieStats, goalieData)
	dataToTxt(goalieData, goalieFile)
	removeDups("goalie")
	dataToJSON(goalieKeys, "goalie")

goalies()
skaters()
