/*Cadastrar Usuário*/
document.getElementById('btnCriarConta')
    .addEventListener('click', function () {

        var baseUrl = localStorage.getItem("baseUrl");

        let erro = document.querySelector(".alert");
        let campo = document.getElementById('campo-erro');
        let campoEmail = document.getElementById('cadEmail');
        let campoSenha = document.getElementById('cadSenha');
        let campoConfirmarSenha = document.getElementById('cadSenhaConfirmacao');
        let email = document.getElementById('cadEmail').value;
        let senha = document.getElementById('cadSenha').value;
        let tp_perfil = document.querySelector('input[name=cadTipo]:checked').value;


        // removendo o elemento da tela sempre que tentar submeter o formulário
        erro.classList.add("d-none");
        $('.is-invalid').removeClass('is-invalid');

        //Validando os campos do formulário de cadastro

        //valida o campo email
        if (campoEmail.value == "") {

            erro.classList.remove("d-none");
            campo.innerHTML = "Preencha o campo email" // nome do campo que não foi preenchido!
            campoEmail.focus();
            campoEmail.classList.add("is-invalid");

            //valida o campo confirmar senha
        } else if (campoSenha.value == "") {

            erro.classList.remove("d-none");
            campo.innerHTML = "Preencha o campo senha" // nome do campo que não foi preenchido!
            campoSenha.focus();
            campoSenha.classList.add("is-invalid");

            //valida o campo senha
        } else if (campoConfirmarSenha.value == "") {

            erro.classList.remove("d-none");
            campo.innerHTML = "Preencha o campo confirmar senha" // nome do campo que não foi preenchido!
            campoConfirmarSenha.focus();
            campoConfirmarSenha.classList.add("is-invalid");

            //valida as senhas sao iguais
        } else if (campoSenha.value != campoConfirmarSenha.value) {

            erro.classList.remove("d-none");
            campoSenha.focus();
            campo.innerHTML = "As senhas devem ser iguais" // nome do campo que não foi preenchido!
            campoConfirmarSenha.focus();
            campoSenha.classList.add("is-invalid");
            campoConfirmarSenha.classList.add("is-invalid");

        } else if (!validarEmail(email)) {

            Swal.fire({
                icon: 'error',
                title: 'Email inválido!',
                text: 'Favor informar um email válido.'
            });

        } else {

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    senha,
                    tp_perfil
                })
            };

            fetch(baseUrl + '/cad-usuario', options)
                .then(response => response.json())
                .then(async response => {
                    if (response.success == false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuário já cadastrado!'
                        });
                    } else {

                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        })

                        await Toast.fire({
                            icon: 'success',
                            title: 'Cadastrado com sucesso'
                        })

                        //Salvando token no localStorage
                        localStorage.setItem("token", response.token);
                        localStorage.setItem("id_usuario", response.id_usuario);
                        localStorage.setItem("perfil", response.tp_perfil);
                        localStorage.setItem("google", false);

                        if (response.tp_perfil == 'fisica') {
                            window.location.href = "src/pages/pessoaFisicaPrincipal.html";
                        } else {
                            window.location.href = "src/pages/pessoaJuridicaPrincipal.html";
                        }
                    }
                })
                .catch(err => console.error(err));

        }
    });

function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}