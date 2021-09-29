# Week 3 Game Assignment
# Stardew Valley Recreation


import random

# an object describing player
player = {
    "name": "p1",
    "score": 0,
    "farm Name": "Magnolia Farm",
    "items": ["flowers"],
    "energy": 10
}

paths = {
    "path1" : "To the Village",
    "path2" : "To Secret Woods",
    "path3" : "To Ranch"
}

# anytime gamer mines rock, they will get a random item
Rock = [
    "geode",
    "copper"]
mineRock = random.choice(Rock)

# definition for game items
def printGraphic(name):

    if(name == "wizard"):
        print ('                  .                      ')          
        print ('                                         ')
        print ('                  .                      ')
        print ('         /^\     .                       ')
        print ('    /\   "V"                             ')
        print ('   /__\   I      O  o                    ')
        print ('  //..\\  I     .                        ')
        print ('  \].`[/  I                              ')
        print ('  /l\/j\  (]    .  O                     ')
        print (' /. ~~ ,\/I          .                   ')
        print (' \\L__j^\/I       o                      ')
        print (' \/--v}  I     o   .                     ')
        print ('  |    |  I   _________                  ')
        print ('  |    |  I c(`       ,)o                ')
        print ('  |    l  I   \.     ,/                  ')
        print (' _/j  L l\_!  _//^---^\\_    -The wizard ')
    
    if(name == "ranch"):
        print ('                                          ')
        print ('                                   +&-    ')
        print ('                          _.-^-._    .--. ')
        print ('                       .-|       |-. |__| ')
        print ('                      /     |_|     \|  | ')
        print ('                     /               \  | ')
        print ('                    /|     _____     |\ | ')
        print ('                     |    |==|==|    |  | ')
        print (' |---|---|---|---|---|    |--|--|    |  | ')
        print (' |---|---|---|---|---|    |==|==|    |  | ')
        print ('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        print ('                       -Marnies Ranch     ')

    if(name == "town"):
        print ('                                    +                                   ')     
        print ('                                   / \                                  ')
        print (' _____        _____     __________/ o \/\_________      _________       ')
        print ('|o o o|_______|    |___|               | | # # #  |____|         | /\   ')
        print ('|o o o|  * * *|: ::|. .|               |o| # # #  |. . |o o o o  |//\\  ')
        print ('|o o o|* * *  |::  |. .| []  []  []  []|o| # # #  |. . |o o o o  |((|)) ')
        print ('|o o o|**  ** |:  :|. .| []  []  []    |o| # # #  |. . |o o o o  |((|)) ')
        print ('|_[]__|__[]___|_||_|__<|____________;;_|_|___/\___|_.|_|____[]___|  |'' ')
        print ('                                                     -The Village       ')

    if(name == "title"):
        print (' #####                                              #     #                                   ')
        print ('#     # #####   ##   #####  #####  ###### #    #    #     #   ##   #      #      ###### #   # ')
        print ('#         #    #  #  #    # #    # #      #    #    #     #  #  #  #      #      #       # #  ')
        print (' #####    #   #    # #    # #    # #####  #    #    #     # #    # #      #      #####    #   ')
        print ('      #   #   ###### #####  #    # #      # ## #     #   #  ###### #      #      #        #   ')
        print ('#     #   #   #    # #   #  #    # #      ##  ##      # #   #    # #      #      #        #   ')
        print (' #####    #   #    # #    # #####  ###### #    #       #    #    # ###### ###### ######   #   ')

def gameOver():

    printGraphic("title")

    print("------------------------------------------")
    print("The day has ended. Come back the next day for more exploring!")
    print("name: " + player["name"])
    print( "energy: " + str(player["energy"]) )
    print( "score: " + str(player["score"]) )
    return

def farm():
    print ("Welcome to your ranch! It sure looks good.")
    printGraphic("ranch")
    input("press enter >")

    print("You're walking around the farm and you see a huge rock.")
    print("Do you mine it with your axe?")
    pcmd = input("please choose yes or no >")

    # the player can choose yes or no
    if (pcmd == "yes"):
        print ("It looks like you mined something! ") 
        print ("It's a " + mineRock + "!" )
        input ("press enter >")
        print ("You pick it up and head to the village...")
        village()
    else:
        print ("No? ... Sorry, you cant do that.")
        pcmd = input("press enter >")
        farm() # repeat over and over until the player chooses yes!


def village():
    print("Mayor: Welcome to our humble town! I heard you just moved here.")
    print("You'll find some interesting things around here...")
    printGraphic("town")
    input("press enter >")

    print("Looks like you're low on energy. You'll need some food.")
    input("press enter >")

    print("Where should you go for food?")
    print("options: [ community center , clinic , jojo mart ]")

    pcmd = input(">")

    if (pcmd == "community center"):
        print ("You're at the community center...")
        print ("It's a little dark and dusty. Its abandoned, there's nothing here.")
        village()
    
    elif (pcmd == "clinic"):
        print ("Dentist Marrie: Hey there, you look a little pale. You should get some food.")
        village()

    elif (pcmd == "jojo mart"):
        print ("jojo mart staff: Hi, welcome to jojo mart!") 
        print ("you finally found some food...")
        print ("what would you like to get?")
        food = input("spaghetti or salad >")
        if (food == "spaghetti"):
            print ("PRICE - 240g") 
            player["energy"] = int(player["energy"]) + 150
            print ( "You've gained " + str(player["energy"]) + "in energy" )
        elif (food == "salad"):
            print ("PRICE - 220g")
            player["energy"] = int(player["energy"]) + 100
            print ( "You've gained " + str(player["energy"]) + "in energy" )

        input ("press enter >")

        print ("jojo mart staff: Wait, are you new here? You have to explore the secret woods!")
        secretWoods()

    else:
        print ("Pick a location")
        village()

def secretWoods():
    print("You have arrived at the Secret Woods...")
    print("You stop when you noticed a mystical tower between the trees. You enter the tower...")
    input("press enter >")

    print("It's a wizard!")
    printGraphic("wizard")
    input("press enter >")

    print("What will you do?")

    if ("geode" in player ["items"]):
        print("options: [ talk to wizard, give geode ]")
    else:
        print (" [options: go back, talk to wizard ]") 

    pcmd = input(">")

    # option 1 : go back
    if (pcmd == "go back"):
        print ("You go back...")
        secretWoods() #try again

    #option 2 : talk to wizard
    elif (pcmd == "talk to wizard"):
        print ("You try and talk to the wizard!")
        input("press enter >")
        print("The wizard gave you magical powers!")
        player["score"] = int(player["score"]) + 280
        print( "Your score increased to: " + str(player["score"]) )
        gameOver()

    # option 3 : give geode
    elif (pcmd == "give geode"):
        print ("You give the geode to the wizard!")
        print("press enter >")
        player["score"] = int(player["score"]) + 400
        print( "Your score increased to: " + str(player["score"]) )
        gameOver()

def introStory():
    # intro to stardew valley
    print ("Good to see you again! What should I call you?")
    player["name"] = input("Please enter your name >")

    # intro story
    print ("Welcome to Stardew Valley " + player["name"] + "!")
    print ("You received a letter from your grandpa...")
    print ("You moved here from the city to take care of your grandpa's ranch, that you recently inherited .")
    print ("Would you like to check out the ranch?")

    pcmd = input("please choose yes or no >")

    # the player can choose yes or no
    if (pcmd == "yes"):
        print ("You walk down the path, to your front yard...")
        input("press enter >")
        farm()
    else:
        print ("No? ... Sorry, you cant do that.")
        pcmd = input("press enter >")
        introStory() # repeat over and over until the player chooses yes!


# main; most programs start with this.
def main():
    printGraphic("title") # call the function to print an image
    introStory() # start the intro

main() # this is the first thing that happens

