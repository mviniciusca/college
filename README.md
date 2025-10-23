# Cadastro de Endereço - Consumo API dos Correios

Este é um projeto web desenvolvido para demonstrar o consumo da API de endereços dos Correios (ViaCEP) utilizando HTML5, CSS3, JavaScript e Bootstrap 5.

## 📋 Descrição do Projeto

O projeto consiste em um formulário web que permite ao usuário digitar um CEP e automaticamente preenche os campos de endereço (rua, bairro, cidade e estado) utilizando a API ViaCEP, que é a API oficial dos Correios para consulta de CEPs.

## 🚀 Funcionalidades

- ✅ **Busca automática de endereço**: Digite o CEP e os campos são preenchidos automaticamente
- ✅ **Validação de CEP**: Verifica se o CEP está no formato correto
- ✅ **Máscara de CEP**: Formatação automática durante a digitação (00000-000)
- ✅ **Interface responsiva**: Funciona perfeitamente em desktop e mobile
- ✅ **Feedback visual**: Alertas e indicadores de carregamento
- ✅ **Design moderno**: Interface atrativa com gradientes e efeitos
- ✅ **Campos editáveis**: Número e complemento podem ser preenchidos manualmente

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica do formulário
- **CSS3**: Estilização avançada com gradientes e animações
- **JavaScript ES6+**: Lógica de negócio e consumo da API
- **Bootstrap 5**: Framework CSS para responsividade
- **Font Awesome**: Ícones modernos
- **API ViaCEP**: API oficial dos Correios para consulta de CEPs

## 📂 Estrutura do Projeto

```
projeto/
├── index.html          # Página principal com o formulário
├── style.css           # Estilos personalizados
├── controller.js       # Lógica JavaScript e consumo da API
├── README.md          # Documentação do projeto
└── .github/
    └── copilot-instructions.md  # Instruções para desenvolvimento
```

## 🎯 Como Usar

### Para Desenvolvimento:

1. **Abra o projeto no VS Code**
2. **Instale a extensão Live Server** (se ainda não tiver)
3. **Clique com o botão direito no index.html** → "Open with Live Server"
4. **O projeto será aberto no navegador** em `http://localhost:5500`

### Para NetBeans:

1. **Copie os arquivos** para um novo projeto HTML5/JS Application no NetBeans
2. **Execute o projeto** pressionando F6 ou clicando em "Run Project"
3. **Configure a extensão do NetBeans** no Chrome se necessário

### Testando a Aplicação:

1. **Digite um CEP válido** (exemplo: 01310-100, 20040-020, 04038-001)
2. **Clique em "Buscar"** ou pressione Enter
3. **Os campos serão preenchidos automaticamente**
4. **Preencha número e complemento se necessário**
5. **Clique em "Salvar"** para simular o salvamento

## 🔧 Configuração para NetBeans

### Pré-requisitos:
- NetBeans IDE instalado
- JDK configurado
- Navegador Google Chrome
- Extensão NetBeans para Chrome (opcional)

### Passos:
1. Abra o NetBeans
2. Vá em File → New Project
3. Escolha HTML5/JavaScript → HTML5/JS Application
4. Nome do projeto: `cadastroEndereco`
5. Escolha "No Site Template"
6. Substitua o conteúdo dos arquivos pelos arquivos deste projeto

## 🌐 API Utilizada

**ViaCEP** - API oficial dos Correios
- URL: `https://viacep.com.br/ws/{cep}/json/`
- Método: GET
- Formato: JSON
- Documentação: https://viacep.com.br/

### Exemplo de resposta:
```json
{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

## 💡 Recursos Implementados

### Validações:
- CEP deve ter exatamente 8 dígitos
- CEP não pode ser uma sequência de números iguais
- Verificação se o CEP existe na base dos Correios

### Interface:
- Loading spinner durante a busca
- Alertas informativos (sucesso, erro, aviso)
- Campos com validação visual (verde/vermelho)
- Botão de limpar formulário
- Design responsivo para mobile

### JavaScript:
- Classes organizadas (CEPValidator, AlertManager, LoadingManager)
- Async/await para requisições
- Event listeners bem estruturados
- Tratamento de erros completo

## 🎨 Personalização

O arquivo `style.css` contém variáveis CSS que podem ser facilmente modificadas:

- **Cores primárias**: Gradientes azul/roxo
- **Cores secundárias**: Verde para sucesso, vermelho para erro
- **Bordas**: Arredondadas (15px)
- **Sombras**: Suaves com blur
- **Animações**: FadeIn e hover effects

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- **Desktop**: Layout completo com múltiplas colunas
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Layout empilhado com botões full-width

## 🔍 Testando CEPs

Alguns CEPs válidos para teste:
- `01310-100` - Av. Paulista, São Paulo/SP
- `20040-020` - Centro, Rio de Janeiro/RJ
- `30140-071` - Centro, Belo Horizonte/MG
- `80010-000` - Centro, Curitiba/PR
- `01001-000` - Sé, São Paulo/SP

## 📋 Checklist de Desenvolvimento

- [x] Criar estrutura HTML5 semântica
- [x] Implementar estilização com CSS3 e Bootstrap
- [x] Desenvolver lógica JavaScript para consumo da API
- [x] Adicionar validações de CEP
- [x] Implementar feedback visual (loading, alertas)
- [x] Garantir responsividade
- [x] Adicionar tratamento de erros
- [x] Documentar o projeto

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e pode ser usado livremente.

## 👨‍💻 Autor

Desenvolvido como projeto acadêmico para demonstração de consumo de APIs web.

---

**Nota**: Este projeto utiliza a API ViaCEP que é gratuita e não requer autenticação. A API está sujeita aos termos de uso do ViaCEP.