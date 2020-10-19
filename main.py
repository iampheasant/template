from flask import Flask, render_template
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap()

#render_template將會找尋html檔案傳送給使用者
@app.route("/page_1")
def page_1():
	return render_template("page_1.html")

@app.route("/page_2")
def page_2():
	return render_template("page_2.html")

@app.route("/page_3")
def page_3():
	return render_template("page_3.html")

@app.route("/page_4")
def page_4():
	return render_template("page_4.html")

@app.route("/index")
def index():
	return render_template("index.html")

@app.route("/guest")
def guest():
	return render_template("guest.html")

@app.route("/reg")
def reg():
	return render_template("reg.html")

@app.route("/sign")
def sign():
	return render_template("sign.html")

if __name__ == "__main__":
	app.run(debug=True)
