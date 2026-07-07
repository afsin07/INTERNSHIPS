#importing requried modules
import pandas as pd
# Read CSV
df = pd.read_csv("Student_results.csv")

# Shape and first 5 rows
print("------- DATASET STRUCTURE -------")
print("Shape:", df.shape)
print("\nFirst 5 Rows:")
print(df.head())

# Percentage Series
print("------- PERCENTAGE SERIES -------")
percentage_series = df["Percentage"]
print("\nPercentage Series:")
print(percentage_series)

# Filter Percentage >= 75
high_percentage = df[df["Percentage"] >= 75]

print("\nStudents with Percentage >= 75:")
print(high_percentage)

high_percentage.to_csv("filtered_high.csv", index=False)

# Maths Marks below 40
low_maths = df[(df["Subject"] == "Maths") & (df["Marks"] < 40)]

print("\nMaths Marks below 40:")
print(low_maths)

print("\nCount:", len(low_maths))

# Query
class2 = df.query("Class == 'II' and Percentage > 60")

print("\nClass II Students with Percentage > 60:")
print(class2)

# Answers
print("\nNumber of students with Percentage >=75:", len(high_percentage))
print("Average Percentage:", high_percentage["Percentage"].mean())

print("\nStudents scoring below 40 in Maths:")
print(low_maths[["Name", "Marks"]])