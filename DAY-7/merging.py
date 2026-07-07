import pandas as pd

# Read CSV files
students = pd.read_csv("Students(1).csv")
results = pd.read_csv("Results.csv")

# Display datasets
print("------------------- DISPLAYING DATASETS(Students) -------------------")
print("Students")
print(students)
print("---------------------------------------------------------------------")

print("------------------- DISPLAYING DATASETS(Results) --------------------")
print("\nResults")
print(results)
print("---------------------------------------------------------------------")
# Duplicate Admission Numbers

print("\nDuplicate Adm_No:", results["Adm_No"].duplicated().sum())

# Inner Merge
print("------------------- PERFORMING MERGE --------------------------------")
inner = pd.merge(students, results, on="Adm_No", how="inner")

print("\n--------------------------------- INNER MERGE ---------------------------------")
print(inner)

inner.to_csv("inner_merge.csv", index=False)

# Left Merge
left = pd.merge(students, results, on="Adm_No", how="left")

print("\n--------------------------------- LEFT MERGE ---------------------------------")
print(left)

print("\nStudents without Results:")
print(left[left["Marks"].isnull()])

# Outer Merge
outer = pd.merge(students, results, on="Adm_No", how="outer")

outer["Marks"] = outer["Marks"].fillna(-1)
outer["Subject"] = outer["Subject"].fillna("No Result")

print("\n--------------------------------- OUTER MERGE ---------------------------------")
print(outer)

# Merge on Multiple Keys
multi = pd.merge(
    students,
    results,
    on="Adm_No",
    how="inner"
)

print("\nMerge on Adm_No")
print(multi)