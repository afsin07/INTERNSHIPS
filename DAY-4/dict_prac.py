#dictionary Card...
student = {
    "name": "Afsin Noor",
    "subject": "Python",
    "score": 78,
    "status": "Pass"
}
# Print each value
print(f"Name    : {student['name']}")
print(f"Subject : {student['subject']}")
print(f"Score   : {student['score']}")
print(f"Status  : {student['status']}")
# Update the score
student["score"] = 90
print("\nAfter Updating Score:\n")
# Print the updated dictionary
print(f"Name    : {student['name']}")
print(f"Subject : {student['subject']}")
print(f"Score   : {student['score']}")
print(f"Status  : {student['status']}")