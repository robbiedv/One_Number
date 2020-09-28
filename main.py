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

	formatted = []
	with open('skatersDB.txt', 'r') as data:
		for line in data:
			line = line.strip()
			ldata = line.split(',')
			if len(ldata) > 10:
				temp_data = {
					'Player': ldata[0],
					'Pos':ldata[1],
					'GP':ldata[2],
					'G':ldata[3],
					'A':ldata[4],
					'P':ldata[5],
					'PM':ldata[6],
					'PPG':ldata[7],
					'PPA':ldata[8],
					'S':ldata[9],
					'BLK':ldata[10],
					'H':ldata[11],
					'FW':ldata[12]
				}
				formatted.append(temp_data)
	with open('skaters.json', 'w') as fp:
		json.dump(formatted, fp, indent=4)
skaters()
