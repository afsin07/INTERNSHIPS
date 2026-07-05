import numpy as np
# Dictionary to store day and steps
steps_dict = {}
try:
    # Open the file
    with open("steps_log.txt", "r") as f:
        # Read every line
        for line in f:
            day, steps = line.strip().split(":")
            steps_dict[day] = int(steps)
except FileNotFoundError:
    print("steps_log.txt not found!")
    exit()
# Convert dictionary values to NumPy array
steps = np.array(list(steps_dict.values()))
mean_steps = steps.mean()
max_steps = steps.max()
min_steps = steps.min()
normalized = (steps - min_steps) / (max_steps - min_steps)
# Function to calculate goal achievement percentage
def goal_rate(step_array):
    goal_days = np.sum(step_array >= 8000)
    percentage = goal_days / len(step_array) * 100
    return percentage
goal_percentage = goal_rate(steps)
days = list(steps_dict.keys())
max_index = np.argmax(steps)
most_active = days[max_index]
min_index = np.argmin(steps)
least_active = days[min_index]
sorted_index = np.argsort(steps)[::-1]
print("\n========== FITTRACK ANALYTICS REPORT ==========\n")

print(f"Average Steps : {mean_steps:.2f}")
print(f"Maximum Steps : {max_steps}")
print(f"Minimum Steps : {min_steps}")
print(f"\nGoal Achievement Rate : {goal_percentage:.2f}%")
print(f"\nMost Active Day : {most_active}")
print(f"Least Active Day : {least_active}")
print("\nNormalized Activity Scores")
for day, score in zip(days, normalized):
    print(f"{day:<10} : {score:.2f}")
print("\nWeekly Ranking (Highest to Lowest)")
# Print ranking
for i in sorted_index:
    print(f"{days[i]} : {steps[i]} steps")