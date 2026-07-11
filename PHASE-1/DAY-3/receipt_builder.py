#defining a function 
def build_receipt(**details):
    receipt = ""
    for key, value in details.items():
        receipt += f"{key}: {value}\n"
    return receipt
# Example 1
print(build_receipt(
    name="Afsin",
    age= 20,
    amount=250,
    type="Food",
    payment="Cash"
))
# Example 2
print(build_receipt(
    name="John",
    age= 19,
    amount=1000,
    type="Electronics",
    payment="UPI"
))