import pandas as pd
from sklearn.datasets import load_iris

# Load Iris dataset
iris = load_iris()

# Create DataFrame
df = pd.DataFrame(iris.data, columns=iris.feature_names)

# Add target column
df['species'] = iris.target
df['species'] = df['species'].map({
    0: 'setosa',
    1: 'versicolor',
    2: 'virginica'
})

# 1. Print complete dataset
print(df.to_string())

# 2. Filter rows where Sepal Length > 5.0
print("\nRows where Sepal Length > 5.0")
print(df[df['sepal length (cm)'] > 5.0])

# 3. Display only Sepal Length and Petal Length
print("\nSelected Columns")
print(df[['sepal length (cm)', 'petal length (cm)']])

# 4. Check missing values
print("\nMissing Values")
print(df.isnull().sum())

# 5. Summary statistics
print("\nSummary Statistics")
print(df.describe())

# 6. Data types
print("\nData Types")
print(df.dtypes)

# OR
print("\nInformation")
print(df.info())

# 7. Save dataset
df.to_csv("iris_dataset.csv", index=False)

print("\nDataset saved successfully!")