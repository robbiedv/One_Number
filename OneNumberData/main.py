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
		# data.append(i.text.replace(" ", "_"))
		data.append(i.text)


###########################
# WRITE DATA TO TEXT FILE #
###########################

def dataToTxt(data, file):
	for stat in data:
		# inserting new line at every player name
		if len(stat) > 4:
			file.write("\n")
			file.write(stat)
			file.write(',')
		else:
			file.write(stat)
			file.write(',')
	file.close()
