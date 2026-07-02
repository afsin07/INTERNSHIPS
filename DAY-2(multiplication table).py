#MuLtiplication table of a number
while True:
    n=input("Enter a number(or type Exit to End):")
    if n=="Exit":
        print("User has ended the program.")
        break
    n=int(n)
    for i in range(1,11):
        result=i*n
        print(f"{n} x {i} = {result}")

    