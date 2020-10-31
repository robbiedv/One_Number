#! /bin/bash/python3

import requests
from bs4 import BeautifulSoup

# POSITIONS TO SCRAPE
skaterStats = ["player",
               "pos",
               "games_played",
               "goals",
               "assists",
               "points",
               "pen_min",
               "goals_pp",
               "assists_pp",
               "shots",
               "blocks",
               "hits",
               "faceoff_wins"
               ]

goalieStats = ["player",
               "starts_goalie",
               "wins_goalie",
               "goals_against",
               "saves",
               "save_pct",
               "shutouts"
               ]

# URLS FOR DATA SCRAPE
skaterURL = ["https://www.hockey-reference.com/leagues/NHL_2020_skaters.html",
             "https://www.hockey-reference.com/leagues/NHL_2019_skaters.html",
             "https://www.hockey-reference.com/leagues/NHL_2018_skaters.html",
             "https://www.hockey-reference.com/leagues/NHL_2017_skaters.html",
             "https://www.hockey-reference.com/leagues/NHL_2016_skaters.html"
             ]

goalieURL = ["https://www.hockey-reference.com/leagues/NHL_2020_goalies.html",
             "https://www.hockey-reference.com/leagues/NHL_2019_goalies.html",
             "https://www.hockey-reference.com/leagues/NHL_2018_goalies.html",
             "https://www.hockey-reference.com/leagues/NHL_2017_goalies.html",
             "https://www.hockey-reference.com/leagues/NHL_2016_goalies.html"
             ]

# LISTS FOR STORING SCRAPED DATA
skaterData = []
goalieData = []


###########################
# CREATE SKATERS DATABASE #
###########################
def scrape(url, stats, data):
    # BEAUTIFUL SOUP SETUP
    for x in url:
        response = requests.get(x)
        content = BeautifulSoup(response.content, "html.parser")

        # TD ELEMENTS WITH A TAG OF 'DATA-STAT' LIST
        scrapedData = content.find_all("td", {"data-stat": stats})

        # LOOPING OVER DATA TO WRITE TO TXT FILE
        yearlyStats = []
        for i in scrapedData:
            yearlyStats.append(i.text)
        data.append(yearlyStats)


###########################
# WRITE DATA TO TEXT FILE #
###########################

def dataToTxt(data, test):
    x = 0
    for year in data:
        # setting up to write a new file for each year
        x = x + 1
        if (test == "goalie"):
            file = open(f'./data/goalie{x}.txt', 'w')
        elif (test == "skater"):
            file = open(f'./data/skater{x}.txt', 'w')
        for stat in year:
            # inserting new line at every player name
            if len(stat) > 6:
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
    x = range(1, 6)
    i = 0
    for year in x:
        i = i + 1
        if (test == "goalie"):
            outfile = open(f'./data/goalieDB{i}.txt', "w")
            infile = open(f'./data/goalie{i}.txt', "r")
            # set for checking against
            namesSeen = set()

            for line in infile:
                name = list(line.strip().split(",", 8))[0]
                if name not in namesSeen:
                    outfile.write(line)
                    namesSeen.add(name)
            outfile.close()

        elif (test == "skater"):
            outfile = open(f'./data/skaterDB{i}.txt', "w")
            infile = open(f'./data/skater{i}.txt', "r")
            # set for checking against
            namesSeen = set()

            for line in infile:
                name = list(line.strip().split(",", 14))[0]
                if name not in namesSeen:
                    outfile.write(line)
                    namesSeen.add(name)
            outfile.close()


def skaters():
    scrape(skaterURL, skaterStats, skaterData)
    dataToTxt(skaterData, "skater")
    removeDups("skater")


def goalies():
    scrape(goalieURL, goalieStats, goalieData)
    dataToTxt(goalieData, "goalie")
    removeDups("goalie")


# goalies()
skaters()
