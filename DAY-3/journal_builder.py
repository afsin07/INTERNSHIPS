#Importing modules
from datetime import datetime
#defining Function add_entry()
def add_entry(text):
    with open("journal.txt","a") as f:
        time = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        f.write(f"{time} - {text}\n")


def show_entries():
    with open("journal.txt","r") as f:
        print(f.read())
# Adding three journal entries
add_entry("My name is Afsin Noor.")
add_entry("I am a curious learning.")
add_entry("I like to watch football matches.")
# Display all inputed entries
show_entries()
#clearing journal entries
with open("journal.txt", "w") as f:
    f.write("")