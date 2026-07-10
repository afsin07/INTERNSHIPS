# task2_classification.py
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# 1. Load dataset
wine = load_wine()

# 2. Separate Features and Target
X = wine.data
y = wine.target

# 3. Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# 4. Train Decision Tree
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# 5. Predict
y_pred = model.predict(X_test)

# 6. Accuracy
accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:", accuracy)