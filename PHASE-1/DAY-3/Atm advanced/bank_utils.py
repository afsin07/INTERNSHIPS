from datetime import datetime

def format_currency(amount):
    return f"Rs. {amount}"

def is_valid_amount(amount):
    return amount > 0

def log_transaction(transaction):
    with open("transactions.txt", "a") as file:
        file.write(f"{datetime.now()} - {transaction}\n")