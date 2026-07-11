import numpy as np
prices = np.array([50, 30, 20, 80, 60])
quantities = np.array([2, 3, 5, 1, 4])
line_totals = prices * quantities
print("Item Totals:", line_totals)
grand_total = line_totals.sum()
print("Grand Total:", grand_total)