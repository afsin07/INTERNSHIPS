import pandas as pd
df = pd.read_csv("students.csv")

print("------------------HIGHEST MARK SCORER --------------------")
highmarks=df[df["Marks"] == df["Marks"].max()]
print(highmarks)

print("------------------AVG CGPA --------------------")
avgcpg=df["CGPA"].mean()
print(avgcpg)

print("------------------BEST ATTENDENCE --------------------")
batt=df[df["Attendance"] == df["Attendance"].max()]
print(batt)

print("------------------AVG ATTENDENCE --------------------")
avgatt=df["Attendance"].mean()
print(avgatt)