import numpy as np
sales = np.array([1200, 1500, 1000, 1800, 1600, 900, 1700])
average = sales.mean()
print("Sales:", sales)
print("Mean:", average)
print("Maximum:", sales.max())
print("Minimum:", sales.min())
print("Total:", sales.sum())
above_average = sales > average
print("Above Average:", above_average)
print("Number of Days Above Average:", above_average.sum())