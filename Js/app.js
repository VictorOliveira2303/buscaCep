
const formulario = document.querySelector('#formulario-cep');
const inputCep = document.querySelector('.input-cep');
const mensagem = document.querySelector('.mensagem');

// Campos que receberão os dados da API
const estado = document.querySelector('.estado');
const cidade = document.querySelector('.cidade');
const endereco = document.querySelector('.endereco');
const ddd = document.querySelector('.ddd');

// Consultar CEP ao enviar o formulário
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const cep = inputCep.value.replace(/\D/g, '');

    // Validar CEP
    if (!/^\d{8}$/.test(cep)) {
        mensagem.textContent = 'Digite um CEP válido com 8 números.';
        limparCampos();
        return;
    }

    try {
        mensagem.textContent = 'Consultando CEP...';

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!resposta.ok) {
            throw new Error('Não foi possível consultar o CEP.');
        }

        const dados = await resposta.json();

        // Verificar se o CEP existe
        if (dados.erro) {
            mensagem.textContent = 'CEP não encontrado. Verifique os números.';
            limparCampos();
            return;
        }

        exibirDados(dados);

        mensagem.textContent = 'CEP encontrado com sucesso!';

    } catch (erro) {
        mensagem.textContent = 'Erro ao consultar o CEP. Tente novamente.';
        limparCampos();
        console.error('Erro na consulta:', erro);
    }
});

// Exibir os dados retornados pela API
function exibirDados(dados) {
    estado.value = dados.uf || '';
    cidade.value = dados.localidade || '';
    endereco.value = dados.logradouro || '';
    ddd.value = dados.ddd || '';
}

// Limpar os campos de resultado
function limparCampos() {
    estado.value = '';
    cidade.value = '';
    endereco.value = '';
    ddd.value = '';
}

// Limpar mensagem ao pressionar o botão Limpar
formulario.addEventListener('reset', () => {
    mensagem.textContent = '';
});