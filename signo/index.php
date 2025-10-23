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