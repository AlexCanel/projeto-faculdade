function validateForm() {
    var name = document.getElementById("name").value;
    var nameError = document.getElementById("nameError");
    var namePattern = /^[A-Za-záàâãéèêíóôõúç ]+$/; // Permite apenas letras e espaços

    if (!namePattern.test(name)) {
      nameError.textContent = "O nome não pode conter números ou caracteres especiais.";
      return false; // Impede o envio do formulário
    } else {
      nameError.textContent = ""; // Limpa a mensagem de erro
    }

    // Verificação de senha e confirmação de senha
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var passwordError = document.getElementById("passwordError");

    if (password !== confirmPassword) {
      passwordError.textContent = "As senhas não coincidem. Tente novamente.";
      return false; // Impede o envio do formulário
    }

    passwordError.textContent = ""; // Limpa a mensagem de erro
    return true; // Permite o envio do formulário
  }

  // Função para voltar para a página de login
  function goBack() {
    window.location.href = "login.html"; // Redireciona para a página login.html
  }

          // Função para validar o login
          function validateLogin() {
            var login = document.getElementById("login").value;
            var password = document.getElementById("password").value;
            var loginError = document.getElementById("loginError");
            var passwordError = document.getElementById("passwordError");

            // Validação do login (não pode conter espaços em branco)
            if (login.trim() === "") {
                loginError.textContent = "O login não pode estar vazio.";
                return false;
            } else {
                loginError.textContent = "";
            }

            // Verifica se a senha foi preenchida
            if (password.trim() === "") {
                passwordError.textContent = "A senha não pode estar vazia.";
                return false;
            } else {
                passwordError.textContent = "";
            }

            // Enviar os dados para o servidor via POST (em um ambiente real, seria necessário enviar para a API para verificação)
            // Simulação de verificação no servidor (isso seria feito no back-end)
            
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Se a resposta do servidor indicar que o login foi bem-sucedido
                    window.location.href = '/dashboard.html'; // Redireciona para a página do dashboard
                } else {
                    // Caso contrário, exibe um erro
                    passwordError.textContent = "Login ou senha inválidos.";
                }
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                passwordError.textContent = "Erro ao tentar fazer login. Tente novamente.";
            });

            return false; // Impede o envio do formulário padrão
        }

    // Função para recuperar a senha
    function retrievePassword() {
      var login = document.getElementById("login").value;
      var loginError = document.getElementById("loginError");
      var passwordResult = document.getElementById("passwordResult");

      // Limpar mensagens de erro e sucesso
      loginError.textContent = '';
      passwordResult.textContent = '';

      // Verifica se o login não está vazio
      if (login.trim() === "") {
        loginError.textContent = "Por favor, insira um login válido.";
        return false;
      }

      // Fazer requisição ao servidor para recuperar a senha
      fetch('/api/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: login })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          passwordResult.textContent = "Sua senha é: " + data.password;
        } else {
          passwordResult.textContent = "Login não encontrado!";
          passwordResult.style.color = "red";
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        passwordResult.textContent = "Ocorreu um erro. Tente novamente.";
        passwordResult.style.color = "red";
      });

      return false; // Impede o envio do formulário
    }

    // Função para voltar para a página de login
    function goBack() {
      window.location.href = "login.html"; // Redireciona para a página login.html
    }