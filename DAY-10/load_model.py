# task4_load_model.py
import pickle
from sklearn.datasets import load_diabetes
# 1. Load Saved Model
with open("diabetes_model.pkl", "rb") as file:
    model = pickle.load(file)
# 2. Load Dataset
diabetes = load_diabetes()
# New patient (first record)
new_patient = diabetes.data[0].reshape(1, -1)
# 3. Predict
prediction = model.predict(new_patient)

print("Predicted Disease Progression:", prediction[0])

# 4. Verification
print("\nPrediction successful without retraining the model!")