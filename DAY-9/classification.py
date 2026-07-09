from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

# Load dataset
iris = load_iris()

X = iris.data
y = iris.target

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Decision Tree
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Predict two sample inputs
sample = [
    [5.1, 3.5, 1.4, 0.2],
    [6.4, 3.2, 4.5, 1.5]
]

prediction = model.predict(sample)

# Print flower names
print("Printing Flower Names:")
for i in prediction:
    print(iris.target_names[i])