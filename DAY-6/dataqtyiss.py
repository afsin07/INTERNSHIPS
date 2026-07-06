import pandas as pd

# Load dataset
df = pd.read_csv("dirty_students.csv")

print("Missing Values:")
print(df.isnull().sum())

print("\nDuplicate Rows:", df.duplicated().sum())

# Numeric columns
numeric_cols = ["Age", "Marks", "Attendance", "CGPA", "Backlogs"]

for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors="coerce")
    df[col] = df[col].fillna(df[col].mean())

# Text columns
text_cols = ["Name", "Department", "Gender", "City", "Year"]

for col in text_cols:
    df[col] = df[col].fillna("Unknown")

# Remove duplicate rows
df = df.drop_duplicates()

# Save cleaned dataset
df.to_csv("cleaned_students.csv", index=False)

print("\nData cleaned successfully!")
print(df.head())