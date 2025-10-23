<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle : 'Consulta de Signos'; ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="theme-toggle">
        <button id="themeToggle" class="theme-btn" aria-label="Alternar modo escuro/claro">
            <span class="sun-icon">☀️</span>
            <span class="moon-icon">🌙</span>
        </button>
    </div>
    <div class="container">
        <header>
            <h1>Consulta de Signos</h1>
            <p class="subtitle">Descubra seu signo do zodíaco</p>
        </header>