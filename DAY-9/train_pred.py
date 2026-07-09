from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import pandas as pd

# Load dataset
iris = load_iris()

X = iris.data
y = iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Predict testing data
y_pred = model.predict(X_test)

# Print actual values
print("Actual Values")
print(y_test)

# Print predicted values
print("\nPredicted Values")
print(y_pred)

# Compare both
comparison = pd.DataFrame({
    "Actual": y_test,
    "Predicted": y_pred
})

print("\nComparison")
print(comparison)