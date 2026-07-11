import pandas as pd

# Load cleaned dataset
df = pd.read_csv("cleaned_students.csv")

# Scholarship eligibility
eligible = df[
    (df["CGPA"] >= 8.5) &
    (df["Attendance"] >= 90) &
    (df["Backlogs"] == 0)
]

# Display results
print("Scholarship Shortlist")
print("-" * 30)

print("\nTotal Eligible Students:")
print(len(eligible))

print("\nEligible Students:")
print(eligible[["Name", "Department", "CGPA"]])

print("\nDepartment Count:")
print(eligible["Department"].value_counts())

print("\nAverage Marks of Eligible Students:")
print(eligible["Marks"].mean())

print("\nAverage Marks of Whole Class:")
print(df["Marks"].mean())

# Save scholarship list
eligible.to_csv("scholarship_shortlist.csv", index=False)

print("\nScholarship shortlist saved successfully!")