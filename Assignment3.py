# this is Assignment 3

import random

# my restaurant algorithm
print ("Welcome to Restaurant Picker!")
print ("We'll help you decide where to eat.")
print ("----------------------------------")

# dining info
yourName = raw_input("What's your name? ")
timeOfDay = raw_input("What time of day will you be going? ")
friends = raw_input("How many friends are going? ")

# this is an array of strings
restaurants = [
    "Dhamaka", 
    "Sweet Moments", 
    "Chic-fil-A", 
    "La Pizza & La Pasta", 
    "Nobu"]

# created the command by concatinating strings
chosenRestaurant = random.choice(restaurants)

# this is the story. it is made up of strings and variables.
story = "Hi, " + yourName + ". " + "We've got a place for you! " \
"At " + timeOfDay + " with " + friends + " friends, " \
"you'll be going to... " + chosenRestaurant + "!"

# this prints the story
print(story)

