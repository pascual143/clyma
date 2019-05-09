import os
from app import app
from controllers import auth, businesses, produts

app.register_blueprint(auth.api, url_prefix='/api')
app.register_blueprint(produts.api, url_prefix='/api')
app.register_blueprint(businesses.api, url_prefix='/api')

# homepage
@app.route('/', defaults={'path': ''})
# any other path
@app.route('/<path:path>')
def catch_all(path):

    if os.path.isfile('dist/' + path): # if path is a file, send it back
        return app.send_static_file(path)

    return app.send_static_file('index.html') # otherwise send back the index.html file
