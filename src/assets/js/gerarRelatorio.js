document.getElementById('btnGerarRelatorio')
    .addEventListener('click', function () {

        document.getElementById('preloaderRelatorio').style.display = 'block';

        var baseUrl = localStorage.getItem("baseUrl");
        
        let dtInicio = document.getElementById('dataInicioRelatorio').value;
        let dtFim = document.getElementById('dataFimRelatorio').value;
        let estado = document.getElementById('nm_estado').value;
        let cidade = document.getElementById('nm_cidade').value;
        let bairro = document.getElementById('selectBairroRelatorio').value;
        let material = document.getElementById('selectMaterialRelatorio').value;

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                dtInicio: dtInicio,
                dtFim: dtFim,
                estado: estado,
                cidade: cidade,
                bairro: bairro,
                material: material

            })
        };

        fetch(baseUrl + '/gerar-relatorio', options)
            .then(response => response.json())
            .then(async response => {

                document.getElementById('preloaderRelatorio').style.display = 'none';

                if (response.success) {

                    await Swal.fire({

                        title: 'Relatório gerado com sucesso!',
                        text: 'Clique no botão abaixo para baixar.',
                        confirmButtonText: 'Baixar',
                        icon: 'success'

                    }).then(async (result) => {

                        if (result.isConfirmed) {
                            console.log('NOME PDF SPLITADO: ' + response.pdf.filename.split('\\'))
                            let pdf = response.pdf.filename.split('\\');
                            console.log('NOME PDF NA VAR PDF: ' + pdf)
                            let iframe = document.createElement('iframe');

                            iframe.setAttribute('src', baseUrl + '/baixar-relatorio/' + pdf[4]);
                            console.log('NOME PDF NO IFRAME: ' + pdf[4])
                            document.getElementById('baixarRelatorio').appendChild(iframe).setAttribute('style', 'display: none');
                        }

                    }).catch(err => console.error(err));

                }
            })
            .catch(err => console.error(err));
    });

