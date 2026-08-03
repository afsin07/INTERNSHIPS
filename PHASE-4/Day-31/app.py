from flask import Flask, render_template

app = Flask(__name__)

# Task 1 & 2 - Home Page
@app.route("/")
def home():
    return render_template("home.html")

# About Page
@app.route("/about")
def about():
    return render_template("about.html")

# Contact Page
@app.route("/contact")
def contact():
    return render_template("contact.html")

# Task 3 - Pass text as response
@app.route("/hello")
def hello():
    return "Hello! Welcome to my first Flask server."

if __name__ == "__main__":
    app.run(debug=True)