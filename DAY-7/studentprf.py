import pandas as pd

# Read CSV files
students = pd.read_csv("Students(1).csv")
results = pd.read_csv("Results.csv")
attendance = pd.read_csv("Attendance.csv")

# Filter Term1 Results
term1 = results[results["Term"] == "Term1"]

# Total and Average Marks
marks = term1.groupby("Adm_No")["Marks"].agg(
    Total_Marks="sum",
    Average_Marks="mean"
).reset_index()

# Attendance Percentage
attendance["Present_Days"] = attendance["Present_Days"].fillna(0)

attendance["Attendance_Percentage"] = (
    attendance["Present_Days"] /
    attendance["Working_Days"]
) * 100

attendance_summary = attendance[
    ["Adm_No", "Attendance_Percentage"]
]

# Merge all datasets
final = pd.merge(students, marks, on="Adm_No", how="left")

final = pd.merge(
    final,
    attendance_summary,
    on="Adm_No",
    how="left"
)

print("--------------- FINAL REPORT ---------------")
print(final)

# Top 5 Students
top5 = final.sort_values(
    by="Average_Marks",
    ascending=False
).head(5)

print("\nTop 5 Students")
print(top5)

# At-Risk Students
at_risk = final[
    (final["Attendance_Percentage"] < 75) &
    (final["Average_Marks"] < 40)
]

print("\nAt-Risk Students")
print(at_risk)

# Round Attendance Percentage
final["Attendance_Percentage"] = final[
    "Attendance_Percentage"
].round(2)

# Export CSV files
final.to_csv("final_report.csv", index=False)
at_risk.to_csv("at_risk.csv", index=False)

print("\nFiles Created Successfully!")