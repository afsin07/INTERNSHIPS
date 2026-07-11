import pandas as pd
df = pd.read_csv("students.csv")
#Looking at the dataset and performing analysis
print("--------------- ROWS AND COLUMNS ----------------")
print("No of Rows and Columns:",df.shape)
print("--------------- COLUMNS NAMES ----------------")
print("Column Names",df.columns)
print("--------------- DATA TYPES ----------------")
print("DataType of each:",df.dtypes)
print("--------------- TOP FEW RECORDS ----------------")
print("First Records from datasets:",df.head())
print("--------------- LAST FEW RECORDS ----------------")
print("Last Records from datasets:",df.tail())
