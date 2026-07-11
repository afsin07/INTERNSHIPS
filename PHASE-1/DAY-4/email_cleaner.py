# Duplicate Email Cleaner using Set
emails = [
    "afsin@gmail.com",
    "john@gmail.com",
    "alice@gmail.com",
    "afsin@gmail.com",
    "rahul@gmail.com",
    "john@gmail.com",
    "sara@gmail.com",
    "noor@gmail.com"
]
print("Original Email List:")
print(emails)
# Convert list to set (removes duplicates)
unique_emails = set(emails)
print("\nUnique Email Addresses:")
print(unique_emails)
# Count
print("\nTotal Emails:", len(emails))
print("Unique Emails:", len(unique_emails))
print("Duplicates Removed:", len(emails) - len(unique_emails))