import sqlite3

def create_database():
    conn = sqlite3.connect('users.db')  # Conectar ao banco de dados
    c = conn.cursor()

    # Criar a tabela 'users' se ela não existir
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL
                 )''')

    conn.commit()  # Confirmar as mudanças no banco
    conn.close()  # Fechar a conexão com o banco de dados

# Chamar a função para criar o banco de dados
create_database()