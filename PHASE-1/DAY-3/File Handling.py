# File Handling
with open("notes.txt", "w") as file:
    file.write("Hello Python!\n")
    file.write("Welcome to File Handling.\n")
with open("notes.txt", "r") as file:
    print(file.read())
with open("notes.txt", "a") as file:
    file.write("This is a new line.\n")
with open("notes.txt", "r") as file:
    print(file.read())
#Error Handling
try:
    with open("sample.txt", "r") as file:
        print(file.read())
except FileNotFoundError:
    print("File not found!")