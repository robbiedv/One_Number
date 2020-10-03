#! /bin/bash/python3

import requests
import json
from bs4 import BeautifulSoup


### Skaters ###

def skaters ():

	#url path, request and parser



	url = "https://www.hockey-reference.com/leagues/NHL_2020_skaters.html"
	response = requests.get(url)
	content = BeautifulSoup(response.content, "html.parser")

	#player, pos, gp, g, a, pim, ppg, ppa, sog, blk, hit, fw

	stats = ["player", "pos", "games_played", "goals", "assists", "points", "pen_min", "goals_pp", "assists_pp", "shots", "blocks", 	"hits", "faceoff_wins"]

##############################################
# FORMAT AND WRITE SCRAPED DATA TO TEXT FILE #
##############################################

	data = []
	scraped = content.find_all("td", {"data-stat": stats})

	file = open('./data/skatersWithDups.txt', 'w')

	for i in scraped:
		data.append(i.text.replace(" ", "_"))
	for x in data:
		if len(x) > 4:
			file.write("\n")
			file.write(x)
			file.write(',')
		else:
			file.write(x)
			file.write(',')


##############################
# REMOVING DUPLICATE ENTRIES #
##############################

	namesSeen = set()
	outfile = open('./data/skatersDB.txt', "w")
	infile = open('./data/skatersWithDups.txt', "r")
	for line in infile:
		name = list(line.strip().split(",", 14))[0]
		print(name)
		if name not in namesSeen:
			outfile.write(line)
			namesSeen.add(name)
	outfile.close()
	print(namesSeen)

###############################################
# CONVERTING TEXT DOC TO JSON AND EXPORT FILE #
###############################################

### Carl Gunnarsson creating duplicate entry in json with no name

	skatersTxt = './data/skatersDB.txt'
	dict1 = {}
	fields = ['Pos','GP','G','A','P','PM','PPG','PPA','S','BLK','H','FW']

	with open(skatersTxt) as skatersDoc:
		for line in skatersDoc:
			name = list( line.strip().split(",", 14))[0]
			description = list(line.strip().split(",", 13))

			if (len(description) > 10):
				i = 0
				dict2 = {}
				while i < len(fields):
					dict2[fields[i]] = description[i+1]
					i = i + 1
					dict1[name] = dict2

	out_file = open("./data/skaters.json", "w")
	json.dump(dict1, out_file, indent = 4)
	out_file.close()

skaters()
