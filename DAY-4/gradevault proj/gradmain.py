from grade_utils import PASS_CUTOFFS
# List of Dictionaries
students = [
    {"name": "Afsin", "subject": "Python", "score": 85, "status": "Distinction"},
    {"name": "Rahul", "subject": "Python", "score": 60, "status": "Pass"},
    {"name": "Sara", "subject": "Java", "score": 45, "status": "Fail"},
    {"name": "John", "subject": "Java", "score": 78, "status": "Distinction"},
    {"name": "Alice", "subject": "Python", "score": 32, "status": "Fail"}
]
#---------------------------------------------------
def add_student(name, subject, score):
    # Decide student status
    if score >= PASS_CUTOFFS[2]:
        status = "Distinction"
    elif score >= PASS_CUTOFFS[1]:
        status = "Pass"
    else:
        status = "Fail"
    student = {
        "name": name,
        "subject": subject,
        "score": score,
        "status": status
    }
    students.append(student)
    # Save details into log file
    with open("grades_log.txt", "a") as f:
        f.write(f"{name} | {subject} | {score} | {status}\n")
    print(f"{name} added successfully.")
#---------------------------------------------------
def list_students():
    print("\nStudent Records\n")
    for student in students:
        print(f"Name : {student['name']}")
        print(f"Subject : {student['subject']}")
        print(f"Score : {student['score']}")
        print(f"Status : {student['status']}")
        print("---------------------")
#---------------------------------------------------
def unique_subjects():
    subjects = set()
    for student in students:
        subjects.add(student["subject"])
    return subjects
#---------------------------------------------------
def class_average(subject):
    total = 0
    count = 0
    for student in students:
        if student["subject"] == subject:
            total += student["score"]
            count += 1
    if count == 0:
        return 0
    return total / count
#---------------------------------------------------
def top_scorer():
    highest = students[0]
    for student in students:

        if student["score"] > highest["score"]:
            highest = student

    return highest
#---------------------------------------------------
def search_student(name):
    for student in students:
        if student["name"].lower() == name.lower():
            return student
    return "Not Found"
# ---------------- MAIN PROGRAM ----------------
print("Unique Subjects:", unique_subjects())
add_student("David", "Python", 90)
list_students()
print("\nPython Average:", class_average("Python"))
print("\nTop Scorer:")
print(top_scorer())
print("\nSearch Result:")
print(search_student("Sara"))