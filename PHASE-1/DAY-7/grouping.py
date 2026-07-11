import pandas as pd

# Read CSV
df = pd.read_csv("Exam_scores.csv")

# Dataset information
print("------------------- DATASET INFO -------------------")
print(df.info())
print("----------------------------------------------------")

print("\nMissing Values:")
print(df.isnull().sum())

# Fill missing Marks with subject-wise mean
df["Marks"] = df.groupby("Subject")["Marks"].transform(
    lambda x: x.fillna(x.mean())
)

print("\nMissing Values After Filling:")
print(df.isnull().sum())

# Group by Subject
print("------------------- GROUPING VALUES -------------------")

subject_summary = df.groupby("Subject")["Marks"].agg(
    ["count", "mean", "min", "max"]
)

print("\nSubject Summary:")
print(subject_summary)

# Group by Student
student_avg = df.groupby("Name")["Marks"].mean()

print("\nAverage Marks by Student:")
print(student_avg)

# Top 3 students
top3 = df.groupby("Name")["Marks"].sum().sort_values(ascending=False).head(3)

print("\nTop 3 Students:")
print(top3)

# Reset Index
print("\nSubject Summary with Reset Index:")
print(subject_summary.reset_index())