#! /bin/bash/python3

import requests
import json
from bs4 import BeautifulSoup


### Skaters ###

def skaters ():

	#url path, request and parser

	url = "https://www.hockey-reference.com/leagues/NHL_2019_skaters.html"
	response = requests.get(url)
	content = BeautifulSoup(response.content, "html.parser")

	#player, pos, gp, g, a, pim, ppg, ppa, sog, blk, hit, fw

	stats = ["player", "pos", "games_played", "goals", "assists", "points", "pen_min", "goals_pp", "assists_pp", "shots", "blocks", 	"hits", "faceoff_wins"]

	data = []
	scraped = content.find_all("td", {"data-stat": stats})
	f = open('skatersDB.txt', 'w')

	#loops over scrape list and appends all data to the players list
	for i in scraped:
		data.append(i.text)
	#loops over all data in players list and formats for importing into SQL table
	for x in data:
		if len(x) > 4:
			f.write("\n")
			f.write(x)
			f.write(',')
		else:
			f.write(x)
			f.write(',')

	skatersTxt = 'skatersDB.txt'
	dict1 = {}

	fields = ['Pos','GP','G','A','P','PM','PPG','PPA','S','BLK','H','FW']

	with open(skatersTxt) as fh:
		dict2 = {}
		for line in fh:
			name = list(line.strip().split(",", 14))[0]
			description = list( line.strip().split(",", 13))
			if (len(description) > 10):
				i = 0
				while i < len(fields):
					dict2[fields[i]] = description[i+1]
					i = i + 1


			dict1[name] = dict2
			print(dict1)

			# j = 0
			# while j < len(dict2):
			# 	dict1[name[0]] = dict2
			# 	j = j = 1

				# description2 = list( line.strip().split(",", 1))
				# j = 0
				# dict2 = {}
				# while j < len(fields2):
				# 	dict2[fields2[j]] =
				# 	j = j + 1

	# with open('skatersDB.txt', 'r') as data:
	# 	for line in data:
	# 		line = line.strip()
	# 		ldata = line.split(',')
	# 		if len(ldata) > 10:
	# 			temp_data = {
	# 			ldata[0]: {
	# 			'Pos':ldata[1],
	# 			'Stats': {
	# 				'GP':ldata[2],
	# 				'G':ldata[3],
	# 				'A':ldata[4],
	# 				'P':ldata[5],
	# 				'PM':ldata[6],
	# 				'PPG':ldata[7],
	# 				'PPA':ldata[8],
	# 				'S':ldata[9],
	# 				'BLK':ldata[10],
	# 				'H':ldata[11],
	# 				'FW':ldata[12]
	# 				}
	# 			}}
	# 			formatted.append(temp_data)
	# with open('skaters.json', 'w') as fp:
	# 	json.dump(formatted, fp, indent=4)
skaters()
