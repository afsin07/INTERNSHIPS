from datetime import datetime
def get_time():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
def find_book(books, title):
    for book in books:
        if book["title"].lower() == title.lower():
            return book
    return None