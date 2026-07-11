# ATM Simulator
balance = 10000
transaction_count = 0
pin = "1234"
for i in range(3):
    entered_pin = input("Enter your 4-digit PIN: ")
    if entered_pin == pin:
        print("Login Successful!\n")
        break
    else:
        print("Wrong PIN!")
else:
    print("Too many wrong attempts!")
    exit()
# ATM Menu
while True:
    print("\n===== WELCOME TO ALNOOR BANK =====")
    print("1. Check Balance")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. Exit")
    choice = int(input("Choose an option: "))
    if choice == 1:
        print(f"Current Balance: ₹{balance}")
    elif choice == 2:
        amt = int(input("Enter amount to deposit: "))
        if amt > 0:
            balance += amt
            transaction_count += 1
            print(f"₹{amt} deposited successfully!")
            print(f"New Balance: ₹{balance}")
        else:
            print("Deposit amount must be greater than 0!")

    elif choice == 3:
        amt = int(input("Enter amount to withdraw: "))
        if amt > 0:
            if amt <= balance:
                balance -= amt
                transaction_count += 1
                print(f"₹{amt} withdrawn successfully!")
                print(f"Remaining Balance: ₹{balance}")
            else:
                print("Insufficient Balance!")
        else:
            print("Invalid amount!")

    elif choice == 4:
        print("\nThank you for using ALNOOR BANK ATM!")
        print(f"Total Transactions: {transaction_count}")
        break
    else:
        print("Invalid Option! Please try again.")