from os import pardir
import turtle 
angle = 91
painter = turtle.Turtle()

painter.pencolor("orange")
painter.pensize(5)
painter.speed(0)
    
for i in range (40):
    painter.forward(100)
    painter.right(20)
    painter.forward(30)
    painter.left(60)
    painter.forward(50)
    painter.right(30)
    painter.penup()
    painter.setposition(0, 0)
    painter.pendown()
    painter.right(0)

painter.pencolor("purple")
painter.pensize(5)
for i in range (40):
    painter.forward(100)
    painter.left(20)
    painter.forward(30)
    painter.right(60)
    painter.forward(50)
    painter.left(30)
    painter.penup()
    painter.setposition(0, 0)
    painter.pendown()
    painter.right(0)

painter.pencolor("orange")
painter.pensize(2)
for i in range (40):
    painter.forward(200)
    painter.right(20)
    painter.forward(30)
    painter.left(60)
    painter.forward(50)
    painter.right(30)
    painter.penup()
    painter.setposition(0, 0)
    painter.pendown()
    painter.right(0)

painter.pencolor("purple")
painter.pensize(2)
for i in range (40):
    painter.forward(200)
    painter.left(20)
    painter.forward(30)
    painter.right(60)
    painter.forward(50)
    painter.left(30)
    painter.penup()
    painter.setposition(0, 0)
    painter.pendown()
    painter.right(0)
    
turtle.done()