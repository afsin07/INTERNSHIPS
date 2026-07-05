import numpy as np
raw_scores = np.array([65, 72, 80, 55, 90, 68])
curved_scores = raw_scores + 4
print("Original Scores:", raw_scores)
print("Curved Scores:", curved_scores)
print("Original Mean:", raw_scores.mean())
print("Curved Mean:", curved_scores.mean())