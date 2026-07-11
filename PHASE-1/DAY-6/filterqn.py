import pandas as pd
df = pd.read_csv("students.csv")
s1=df[(df["Marks"] > 80) & (df["Backlogs"] == 0)]
print("Students with Marks above 80 and Zero Backlogs:",s1)
s2=df[(df["Department"] == "CSE") & (df["Year"] == "3rd Year")]
print("Students from CSE department in 3rd Year",s2)
average = df["CGPA"].mean()
print("Students whose CGPA is above class average",df[df["CGPA"] > average])
