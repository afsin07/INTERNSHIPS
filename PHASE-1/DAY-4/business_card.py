# Digital Business Card using Dictionary
business_card = {
    "name": "Afsin Noor",
    "role": "AI & Data Science Student",
    "email": "afsin@example.com",
    "phone": "9876543210",
    "linkedin": "linkedin.com/in/afsin"
}
print("----- BUSINESS CARD -----")
print(f"Name      : {business_card['name']}")
print(f"Role      : {business_card['role']}")
print(f"Email     : {business_card['email']}")
print(f"Phone     : {business_card['phone']}")
print(f"LinkedIn  : {business_card['linkedin']}")
# Update Role
business_card["role"] = "Python Developer"
print("\nAfter Updating Role\n")
print("----- BUSINESS CARD -----")
print(f"Name      : {business_card['name']}")
print(f"Role      : {business_card['role']}")
print(f"Email     : {business_card['email']}")
print(f"Phone     : {business_card['phone']}")
print(f"LinkedIn  : {business_card['linkedin']}")