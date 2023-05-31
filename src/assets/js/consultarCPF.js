document.getElementById('documento_principal')
    .addEventListener('focusout', function () {

        var url = window.location.pathname;

        if (url == '/src/pages/pessoaJuridicaPrincipal.html') {
            document.getElementById('preloaderColetor').style.display = 'block';
        } else {
            document.getElementById('preloader').style.display = 'block';
        }

        let inputs = document.getElementsByClassName('inputsPerfil');

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].id == 'nm_usuario' || inputs[i].id == 'sobrenome_usuario' || inputs[i].id == 'nascimento' || inputs[i].id == 'email'
                || inputs[i].id == 'documento_principal'){
                    inputs[i].setAttribute('disabled', '');
                }
        }

        let nascimento = document.getElementById('nascimento').value;
        let origem = 'web';
        let token = 'u_ypy-1XJyKIFB6qKGSMGeWn2iH7kYHNa0728Bf5'
        let cpfCompleto = document.getElementById('documento_principal').value;

        cpfSemPonto = cpfCompleto.replace('.', '');
        cnpfSemPonto1 = cpfSemPonto.replace('.', '');
        cpf = cnpfSemPonto1.replace('-', '');

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cpf: cpf,
                birthdate: nascimento,
                origem: origem,
                token: token
            })
        };

        fetch('https://reciclense.herokuapp.com/consultar-cpf', options)
            .then(response => response.json())
            .then(async response => {

                if (response.code == 608) {

                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].id == 'nm_usuario' || inputs[i].id == 'sobrenome_usuario' || inputs[i].id == 'nascimento' || inputs[i].id == 'btnCadastrarColetor'
                            || inputs[i].id == 'documento_principal' || inputs[i].id == 'cnpj' || inputs[i].id == 'nome-coletor' || inputs[i].id == 'sobrenome-coletor') {
                            inputs[i].removeAttribute('disabled', '');
                        }
                    }

                    if (url == '/src/pages/pessoaJuridicaPrincipal.html') {
                        document.getElementById('preloaderColetor').style.display = 'none';
                    } else {
                        document.getElementById('preloader').style.display = 'none';
                    }

                    Swal.fire('Data de nascimento divergente!', 'Favor informar a data de nascimento correta', 'error');

                    document.getElementById('nascimento').value = '';
                    document.getElementById('documento_principal').value = '';

                } else if (!response.success) {

                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].id == 'nm_usuario' || inputs[i].id == 'sobrenome_usuario' || inputs[i].id == 'nascimento' || inputs[i].id == 'btnCadastrarColetor'
                            || inputs[i].id == 'documento_principal' || inputs[i].id == 'cnpj' || inputs[i].id == 'nome-coletor' || inputs[i].id == 'sobrenome-coletor') {
                            inputs[i].removeAttribute('disabled', '');
                        }
                    }

                    if (url == '/src/pages/pessoaJuridicaPrincipal.html') {
                        document.getElementById('preloaderColetor').style.display = 'none';
                    } else {
                        document.getElementById('preloader').style.display = 'none';
                    }

                    await Swal.fire('CPF inexistente!', 'Favor informar um CPF válido', 'error');

                    document.getElementById('nascimento').value = '';
                    document.getElementById('documento_principal').value = '';

                } else {

                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].id == 'nm_usuario' || inputs[i].id == 'sobrenome_usuario' || inputs[i].id == 'nascimento' || inputs[i].id == 'btnCadastrarColetor'
                            || inputs[i].id == 'documento_principal' || inputs[i].id == 'cnpj' || inputs[i].id == 'nome-coletor' || inputs[i].id == 'sobrenome-coletor') {
                            inputs[i].removeAttribute('disabled', '');
                        }
                    }

                    if (url == '/src/pages/pessoaJuridicaPrincipal.html') {
                        document.getElementById('preloaderColetor').style.display = 'none';
                    } else {
                        document.getElementById('preloader').style.display = 'none';
                    }

                }
            })
            .catch(err => console.error(err));

    });