async function buscarEndereco() {
    const enderecoSalvo = localStorage.getItem("endereco");

    if (enderecoSalvo) {
        const confirmacao = confirm("Já existe um endereço salvo. Deseja fazer uma nova requisição?");
        if (confirmacao) {
            solicitarCEP();
        }
    } else {
        solicitarCEP();
    }
}

function solicitarCEP() {
    const cep = prompt("Por favor, insira o CEP (apenas números):");
    const url = `https://viacep.com.br/ws/${cep}/json`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar endereço: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const { logradouro, complemento, bairro, localidade, uf } = data;
            const enderecoFormatado = `${logradouro}, ${complemento ? complemento + ' - ' : ''}${bairro} - ${localidade}/${uf}`;
            const confirmacao = confirm(`Confirme se os dados estão corretos:\n\n${enderecoFormatado}`);
            if (confirmacao) {
                const endereco = { logradouro, complemento, bairro, localidade, uf };
                localStorage.setItem("endereco", JSON.stringify(endereco));
                alert("Endereço salvo com sucesso!");
            } else {
                alert("Por favor, corrija os dados informados.");
            }
        })
        .catch(error => {
            console.error('Erro ao buscar endereço:', error);
            alert('Ocorreu um erro ao buscar o endereço. Por favor, tente novamente.');
        });
}

buscarEndereco();
