from os import pardir
import turtle 
painter = turtle.Turtle()

painter.pencolor("orange")
painter.pensize(5)
painter.speed(0)

count = 1
n1, n2 = 1, 1
while count < 20:
    nth = n1 + n2
    for i in range(90):
        painter.right(1)
        painter.forward(nth/20)

    n1 = n2
    n2 = nth
    count += 1

turtle.done()