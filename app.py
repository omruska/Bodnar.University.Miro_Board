from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

boards = []


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/create_board', methods=['GET', 'POST'])
def create_board():
    if request.method == 'POST':
        # Get form data
        board_name = request.form['board_name']
        board_type = request.form['board_type']

        # Create a new board based on user input
        new_board = {'name': board_name, 'type': board_type}
        boards.append(new_board)

        # Redirect to the appropriate page based on board type
        if board_type == 'whiteboard':
            return redirect(url_for('view_board', board_name=board_name))
        elif board_type == 'kanban':
            return redirect(url_for('project_kanban'))
        elif board_type == 'mindmap':
            # You can add a redirect for mindmap boards if needed
            pass

    return render_template('create_board.html')


@app.route('/board/<board_name>')
def view_board(board_name):
    # Find the board in the list of created boards
    board = next((board for board in boards if board['name'] == board_name), None)
    if board:
        # Render the template for viewing the board
        return render_template('view_board.html', board=board)
    else:
        # If the board is not found, return a 404 error
        return render_template('404.html'), 404


@app.route('/project_kanban')
def project_kanban():
    return render_template('project_kanban.html')


if __name__ == '__main__':
    app.run()
