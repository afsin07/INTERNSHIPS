# task1_explore.py
from sklearn.datasets import load_iris
import pandas as pd

# 1. Load the Iris dataset
iris = load_iris()

# Convert to DataFrame
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df["species"] = [iris.target_names[i] for i in iris.target]

# 2. Display the first 5 rows
print("First 5 Rows:\n")
print(df.head())

# 3. Find total number of flowers in each species
print("\nNumber of Flowers in Each Species:\n")
print(df["species"].value_counts())

# 4. Find the average value of all features for each species
print("\nAverage of Features for Each Species:\n")
print(df.groupby("species").mean())

# 5. Display all Virginica flowers whose Petal Length > dataset average
avg_petal_length = df["petal length (cm)"].mean()

filtered = df[
    (df["species"] == "virginica") &
    (df["petal length (cm)"] > avg_petal_length)
]

print("\nVirginica Flowers with Petal Length Greater than Dataset Average:\n")
print(filtered)

# 6. Find the species with the highest average Sepal Length
avg_sepal = df.groupby("species")["sepal length (cm)"].mean()

print("\nSpecies with Highest Average Sepal Length:")
print(avg_sepal.idxmax())

# 7. Create a new column: Sepal Area
df["Sepal Area"] = df["sepal length (cm)"] * df["sepal width (cm)"]

print("\nDataset with Sepal Area:\n")
print(df.head())

# 8. Save the filtered data
filtered.to_csv("filtered_iris.csv", index=False)

print("\nfiltered_iris.csv saved successfully!")