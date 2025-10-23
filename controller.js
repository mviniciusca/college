/**
 * Controller para o formulário de cadastro de endereço
 * Consumo da API ViaCEP (API oficial dos Correios)
 * Autor: Sistema de Cadastro de Endereço
 * Data: 2025
 */

// Elementos do DOM
const cepInput = document.getElementById('cep');
const btnBuscar = document.getElementById('btnBuscar');
const btnLimpar = document.getElementById('btnLimpar');
const form = document.getElementById('addressForm');
const loading = document.getElementById('loading');
const alertContainer = document.getElementById('alertContainer');

// Campos do formulário
const campos = {
    logradouro: document.getElementById('logradouro'),
    bairro: document.getElementById('bairro'),
    localidade: document.getElementById('localidade'),
    uf: document.getElementById('uf'),
    numero: document.getElementById('numero'),
    complemento: document.getElementById('complemento')
};

/**
 * Classe para gerenciar alertas
 */
class AlertManager {
    static show(message, type = 'info') {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="fas fa-${this.getIcon(type)}"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }

    static getIcon(type) {
        const icons = {
            success: 'check-circle',
            danger: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    static clear() {
        alertContainer.innerHTML = '';
    }
}

/**
 * Classe para validação de CEP
 */
class CEPValidator {
    static validate(cep) {
        // Remove caracteres não numéricos
        const cleanCep = cep.replace(/\D/g, '');

        // Verifica se tem 8 dígitos
        if (cleanCep.length !== 8) {
            return { valid: false, message: 'CEP deve ter 8 dígitos' };
        }

        // Verifica se não é uma sequência de números iguais
        if (/^(\d)\1{7}$/.test(cleanCep)) {
            return { valid: false, message: 'CEP inválido' };
        }

        return { valid: true, cleanCep };
    }

    static format(cep) {
        const cleanCep = cep.replace(/\D/g, '');
        return cleanCep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    }
}

/**
 * Classe para gerenciar o estado de loading
 */
class LoadingManager {
    static show() {
        loading.style.display = 'block';
        loading.classList.add('show');
        btnBuscar.disabled = true;
        btnBuscar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
    }

    static hide() {
        loading.style.display = 'none';
        loading.classList.remove('show');
        btnBuscar.disabled = false;
        btnBuscar.innerHTML = '<i class="fas fa-search"></i> Buscar';
    }
}

/**
 * Classe principal para busca de CEP
 */
class CEPService {
    static async buscarCEP(cep) {
        const cleanCep = cep.replace(/\D/g, '');
        const url = `https://viacep.com.br/ws/${cleanCep}/json/`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Erro na requisição');
            }

            const data = await response.json();

            if (data.erro) {
                throw new Error('CEP não encontrado');
            }

            return data;
        } catch (error) {
            throw new Error(`Erro ao buscar CEP: ${error.message}`);
        }
    }
}

/**
 * Preenche os campos do formulário com os dados do endereço
 */
function preencherCampos(dados) {
    campos.logradouro.value = dados.logradouro || '';
    campos.bairro.value = dados.bairro || '';
    campos.localidade.value = dados.localidade || '';
    campos.uf.value = dados.uf || '';

    // Foca no campo número se o logradouro foi preenchido
    if (dados.logradouro) {
        campos.numero.focus();
    }

    // Adiciona efeito visual de preenchimento
    Object.values(campos).forEach(campo => {
        if (campo.value && campo.readOnly) {
            campo.classList.add('is-valid');
            setTimeout(() => campo.classList.remove('is-valid'), 2000);
        }
    });
}

/**
 * Limpa todos os campos do formulário
 */
function limparCampos() {
    // Limpa campos de endereço
    Object.values(campos).forEach(campo => {
        campo.value = '';
        campo.classList.remove('is-invalid', 'is-valid');
    });

    // Limpa o CEP
    cepInput.value = '';
    cepInput.classList.remove('is-invalid', 'is-valid');

    // Limpa alertas
    AlertManager.clear();

    // Foca no campo CEP
    cepInput.focus();

    AlertManager.show('Formulário limpo com sucesso!', 'info');
}

/**
 * Busca endereço pelo CEP
 */
async function buscarEndereco() {
    const cep = cepInput.value.trim();

    // Limpa alertas anteriores
    AlertManager.clear();
    cepInput.classList.remove('is-invalid', 'is-valid');

    // Valida CEP
    const validation = CEPValidator.validate(cep);
    if (!validation.valid) {
        cepInput.classList.add('is-invalid');
        document.getElementById('cepError').textContent = validation.message;
        AlertManager.show(validation.message, 'danger');
        return;
    }

    // Formata CEP no campo
    cepInput.value = CEPValidator.format(validation.cleanCep);

    // Mostra loading
    LoadingManager.show();

    try {
        // Busca dados do CEP
        const dados = await CEPService.buscarCEP(validation.cleanCep);

        // Preenche formulário
        preencherCampos(dados);

        // Marca CEP como válido
        cepInput.classList.add('is-valid');

        // Mostra sucesso
        AlertManager.show(
            `Endereço encontrado: ${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`,
            'success'
        );

    } catch (error) {
        // Marca CEP como inválido
        cepInput.classList.add('is-invalid');
        document.getElementById('cepError').textContent = error.message;

        // Mostra erro
        AlertManager.show(error.message, 'danger');

        // Limpa campos preenchidos
        Object.values(campos).forEach(campo => {
            if (campo.readOnly) {
                campo.value = '';
            }
        });

    } finally {
        // Esconde loading
        LoadingManager.hide();
    }
}

/**
 * Máscara para o campo CEP
 */
function aplicarMascaraCEP(evento) {
    let valor = evento.target.value.replace(/\D/g, '');

    // Limita a 8 dígitos
    valor = valor.substring(0, 8);

    // Aplica máscara
    if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
    }

    evento.target.value = valor;

    // Remove validação ao editar
    evento.target.classList.remove('is-invalid', 'is-valid');
    AlertManager.clear();
}

/**
 * Validação do formulário antes do envio
 */
function validarFormulario(evento) {
    evento.preventDefault();

    AlertManager.clear();

    // Verifica se CEP foi preenchido e é válido
    const cep = cepInput.value.trim();
    const validation = CEPValidator.validate(cep);

    if (!validation.valid) {
        AlertManager.show('Por favor, preencha um CEP válido antes de salvar.', 'warning');
        cepInput.focus();
        return false;
    }

    // Verifica se os campos obrigatórios foram preenchidos pela API
    if (!campos.logradouro.value || !campos.localidade.value) {
        AlertManager.show('Por favor, busque um CEP válido antes de salvar.', 'warning');
        return false;
    }

    // Simula salvamento (aqui você pode implementar o envio para um servidor)
    AlertManager.show(
        'Endereço salvo com sucesso! Em um sistema real, os dados seriam enviados para o servidor.',
        'success'
    );

    return true;
}

/**
 * Event Listeners
 */
document.addEventListener('DOMContentLoaded', function () {
    // Busca de CEP
    btnBuscar.addEventListener('click', buscarEndereco);

    // Limpar formulário
    btnLimpar.addEventListener('click', limparCampos);

    // Máscara do CEP
    cepInput.addEventListener('input', aplicarMascaraCEP);

    // Buscar CEP ao pressionar Enter
    cepInput.addEventListener('keypress', function (evento) {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            buscarEndereco();
        }
    });

    // Validação do formulário
    form.addEventListener('submit', validarFormulario);

    // Foco inicial no campo CEP
    cepInput.focus();

    // Tooltip para campos somente leitura
    Object.values(campos).forEach(campo => {
        if (campo.readOnly) {
            campo.title = 'Este campo é preenchido automaticamente pela busca do CEP';
        }
    });

    // Mostra mensagem de boas-vindas
    setTimeout(() => {
        AlertManager.show(
            'Digite o CEP no campo acima e clique em "Buscar" para preencher automaticamente o endereço.',
            'info'
        );
    }, 1000);
});

/**
 * Funções utilitárias globais
 */
window.CadastroEndereco = {
    buscarEndereco,
    limparCampos,
    CEPValidator,
    AlertManager,
    LoadingManager
};