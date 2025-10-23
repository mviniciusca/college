<?php
$pageTitle = 'Consulta de Signos - Página Inicial';
include 'header.php';
?>

<main>
    <div class="form-container">
        <form action="resultado.php" method="POST">
            <div class="form-group">
                <label for="data_nascimento">Data de Nascimento:</label>
                <input 
                    type="date" 
                    id="data_nascimento" 
                    name="data_nascimento" 
                    required
                    max="<?php echo date('Y-m-d'); ?>"
                >
            </div>
            <button type="submit" class="btn">Descobrir Meu Signo</button>
        </form>
    </div>
</main>

<footer>
    <p class="footer-text">© 2025 Consulta de Signos - Desenvolvido por <a href="https://github.com/mviniciusca" target="_blank" class="footer-link">Marcos Coelho</a></p>
</footer>

</body>
</html>