# To-Do List Manager using List
tasks = []
def add_task(task):
    tasks.append(task)
    print(task, "added successfully.")
def complete_task(task):
    if task in tasks:
        tasks.remove(task)
        print(task, "completed and removed.")
    else:
        print("Task not found.")
def pending_count():
    return len(tasks)
# Adding tasks
add_task("Study Python")
add_task("Complete Assignment")
add_task("Practice Coding")
# Completing one task
complete_task("Complete Assignment")
# Display pending tasks
print("\nPending Tasks:")
for i, task in enumerate(tasks, start=1):
    print(f"{i}. {task}")
print("\nTotal Pending Tasks:", pending_count())