import os
from flask import Flask, flash, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash  # Para hashing de senha

app = Flask(__name__)

# Conexão com o banco de dados
# Usando o DATABASE_URL no Heroku, que é configurado automaticamente, ou o SQLite localmente
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///users.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Definindo a estrutura da tabela de usuários
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Rota para a página de cadastro
@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        # Receber os dados do formulário
        name = request.form['name']
        username = request.form['username']
        password = request.form['password']

        # Verificar se o nome de usuário já existe
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Nome de usuário já existe! Escolha outro.', 'error')
            return redirect(url_for('cadastro'))

        # Gerando o hash da senha
        hashed_password = generate_password_hash(password)

        # Criar um novo usuário no banco de dados com a senha criptografada
        new_user = User(name=name, username=username, password=hashed_password)

        try:
            # Adicionar e salvar no banco de dados
            db.session.add(new_user)
            db.session.commit()
            flash('Cadastro realizado com sucesso!', 'success')
            return redirect(url_for('cadastro'))
        except Exception as e:
            flash(f'Ocorreu um erro: {e}', 'error')
            return redirect(url_for('cadastro'))

    return render_template('cadastro.html')

# Criação das tabelas (apenas uma vez quando o servidor é iniciado)
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)