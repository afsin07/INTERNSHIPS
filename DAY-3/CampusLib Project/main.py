#importing Required Modules and Libraries
from library_utils import get_time, find_book
books = []
#defining Each functions
def add_book(title, author):
    books.append({"title": title, "author": author, "available": True})
    print("Book Added!") 
#-----------------------------------------------------------------        
def list_books():
    if not books:
        print("No books available.")
    else:
        for book in books:
            status = "Available" if book["available"] else "Borrowed"
            print(f"{book['title']} | {book['author']} | {status}")
#-----------------------------------------------------------------             
def borrow_book(title):
    book = find_book(books, title)
    if book and book["available"]:
        book["available"] = False
        with open("borrow_log.txt", "a") as file:
            file.write(f"{get_time()} | BORROWED | {title}\n")
        print("Book Borrowed!")
    else:
        print("Book not available.")
#-----------------------------------------------------------------       
def return_book(title):
    book = find_book(books, title)

    if book and not book["available"]:
        book["available"] = True
        with open("borrow_log.txt", "a") as file:
            file.write(f"{get_time()} | RETURNED | {title}\n")
        print("Book Returned!")
    else:
        print("Book not found or already returned.")
#----------------------------------------------------------------- 
def view_log():
    try:
        with open("borrow_log.txt", "r") as file:
            print(file.read())
    except FileNotFoundError:
        print("No borrow log found.")
#----------------------------------------------------------------- 
def summarize_library(**stats):
    print("\n--- Library Summary ---")
    for key, value in stats.items():
        print(f"{key}: {value}")
#------------------- MAIN MENU ------------------------------------
while True:
    print("\n===== CAMPUS LIBRARY =====")
    print("1. Add Book")
    print("2. List Books")
    print("3. Borrow Book")
    print("4. Return Book")
    print("5. View Borrow Log")
    print("6. Exit")
    choice = input("Enter choice: ") #User Input
    if choice == "1":
        title = input("Book Title: ")
        author = input("Author: ")
        add_book(title, author)
    elif choice == "2":
        list_books()
    elif choice == "3":
        title = input("Book Title: ")
        borrow_book(title)
    elif choice == "4":
        title = input("Book Title: ")
        return_book(title)
    elif choice == "5":
        view_log()
    elif choice == "6":
        borrowed = sum(not b["available"] for b in books)
        summarize_library(
            Total_Books=len(books),
            Borrowed=borrowed,
            Available=len(books) - borrowed
        )
        print("Thank You!")
        break
    else:
        print("Invalid Choice!")