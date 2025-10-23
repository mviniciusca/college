<?php
$pageTitle = 'Consulta de Signos - Resultado';

// Função para carregar os signos do arquivo XML
function carregarSignos()
{
    $signos = [];

    if (file_exists('signos.xml')) {
        $xml = simplexml_load_file('signos.xml');

        foreach ($xml->signo as $signo) {
            $signos[] = [
                'nome' => (string) $signo->nome,
                'simbolo' => (string) $signo->simbolo,
                'dataInicio' => (string) $signo->dataInicio,
                'dataFim' => (string) $signo->dataFim,
                'descricao' => (string) $signo->descricao
            ];
        }
    }

    return $signos;
}

// Função para verificar qual signo corresponde à data
function encontrarSigno($dataNascimento)
{
    $signos = carregarSignos();

    // Extrair dia e mês da data de nascimento
    $timestamp = strtotime($dataNascimento);
    $diaUsuario = (int) date('d', $timestamp);
    $mesUsuario = (int) date('m', $timestamp);

    foreach ($signos as $signo) {
        // Converter datas do signo para comparação
        list($diaInicio, $mesInicio) = explode('/', $signo['dataInicio']);
        list($diaFim, $mesFim) = explode('/', $signo['dataFim']);

        $diaInicio = (int) $diaInicio;
        $mesInicio = (int) $mesInicio;
        $diaFim = (int) $diaFim;
        $mesFim = (int) $mesFim;

        // Verificar se a data está no range do signo
        $dentroDoRange = false;

        if ($mesInicio == $mesFim) {
            // Signo dentro do mesmo mês
            if ($mesUsuario == $mesInicio && $diaUsuario >= $diaInicio && $diaUsuario <= $diaFim) {
                $dentroDoRange = true;
            }
        } else {
            // Signo que atravessa dois meses
            if (($mesUsuario == $mesInicio && $diaUsuario >= $diaInicio) ||
                ($mesUsuario == $mesFim && $diaUsuario <= $diaFim)) {
                $dentroDoRange = true;
            }
        }

        if ($dentroDoRange) {
            return $signo;
        }
    }

    return null;
}

// Processar a data enviada pelo formulário
$signoEncontrado = null;
$erro = null;

if ($_POST && isset($_POST['data_nascimento']) && !empty($_POST['data_nascimento'])) {
    $dataNascimento = $_POST['data_nascimento'];
    $signoEncontrado = encontrarSigno($dataNascimento);

    if (!$signoEncontrado) {
        $erro = "Não foi possível determinar o signo para a data informada.";
    }
} else {
    $erro = "Por favor, informe uma data de nascimento válida.";
}

include 'header.php';
?>

<main>
    <?php if ($erro): ?>
        <div class="error-message">
            <p><?php echo htmlspecialchars($erro); ?></p>
            <a href="index.php" class="back-link">Voltar ao formulário</a>
        </div>
    <?php elseif ($signoEncontrado): ?>
        <div class="result-container">
            <h2 class="signo-name">
                <span class="signo-symbol"><?php echo htmlspecialchars($signoEncontrado['simbolo']); ?></span>
                <?php echo htmlspecialchars($signoEncontrado['nome']); ?>
            </h2>
            <p class="signo-period">
                <?php echo htmlspecialchars($signoEncontrado['dataInicio']); ?> - 
                <?php echo htmlspecialchars($signoEncontrado['dataFim']); ?>
            </p>
            <p class="signo-description">
                <?php echo htmlspecialchars($signoEncontrado['descricao']); ?>
            </p>
            <a href="index.php" class="back-link">Consultar Outro Signo</a>
        </div>
    <?php endif; ?>
</main>

<footer>
    <p class="footer-text">© 2025 Consulta de Signos - Desenvolvido por <a href="https://github.com/mviniciusca" target="_blank" class="footer-link">Marcos Coelho</a></p>
</footer>

<script>
// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});
</script>

</body>
</html>