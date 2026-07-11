import math
import random
from datetime import datetime

# Math Module
print("Square Root:", math.sqrt(25))
print("Value of Pi:", round(math.pi, 2))

# Random Module
print("Random Number:", random.randint(1, 10))
print("Random Letter:", random.choice(["A", "B", "C"]))

# Datetime Module
print("Current Date & Time:", datetime.now().strftime("%d-%m-%Y %H:%M:%S"))