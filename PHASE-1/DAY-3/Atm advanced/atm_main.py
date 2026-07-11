from bank_utils import format_currency, is_valid_amount, log_transaction

balance = 5000

def check_balance():
    print("Balance:", format_currency(balance))

def deposit():
    global balance
    amount = float(input("Enter amount: "))

    if is_valid_amount(amount):
        balance += amount
        log_transaction(f"Deposited Rs.{amount}")
        print("Deposit Successful!")
    else:
        print("Invalid Amount!")

def withdraw():
    global balance
    amount = float(input("Enter amount: "))

    if is_valid_amount(amount) and amount <= balance:
        balance -= amount
        log_transaction(f"Withdrawn Rs.{amount}")
        print("Withdrawal Successful!")
    else:
        print("Insufficient Balance!")

def view_history():
    try:
        with open("transactions.txt", "r") as file:
            print(file.read())
    except FileNotFoundError:
        print("No Transactions Yet!")

while True:
    print("\n1.Check Balance")
    print("2.Deposit")
    print("3.Withdraw")
    print("4.View History")
    print("5.Exit")

    choice = input("Enter Choice: ")

    if choice == "1":
        check_balance()

    elif choice == "2":
        deposit()

    elif choice == "3":
        withdraw()

    elif choice == "4":
        view_history()

    elif choice == "5":
        print("Thank You!")
        break

    else:
        print("Invalid Choice!")