# task3_regression.py
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import pickle

# 1. Load Diabetes Dataset
diabetes = load_diabetes()

# 2. Separate Features and Target
X = diabetes.data
y = diabetes.target

# 3. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# 4. Train Model
model = LinearRegression()
model.fit(X_train, y_train)

# 5. Predict
y_pred = model.predict(X_test)

# 6. Print Actual and Predicted Values
print("Actual Values:\n", y_test[:10])

print("\nPredicted Values:\n", y_pred[:10])

# 7. Mean Squared Error
mse = mean_squared_error(y_test, y_pred)

print("\nMean Squared Error:", mse)

# 8. Save Model using Pickle
with open("diabetes_model.pkl", "wb") as file:
    pickle.dump(model, file)

print("\nModel saved as diabetes_model.pkl")