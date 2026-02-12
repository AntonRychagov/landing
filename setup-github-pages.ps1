# Скрипт для настройки GitHub Pages
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Настройка GitHub Pages для Next.js" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Шаг 1: Открываю настройки GitHub Pages..." -ForegroundColor Yellow
Start-Process "https://github.com/AntonRychagov/landing/settings/pages"

Write-Host ""
Write-Host "ИНСТРУКЦИЯ:" -ForegroundColor Green
Write-Host "1. В открывшемся окне найдите раздел 'Build and deployment'" -ForegroundColor White
Write-Host "2. В поле 'Source' выберите 'GitHub Actions' (вместо 'Deploy from a branch')" -ForegroundColor White
Write-Host "3. Сохраните изменения (если требуется)" -ForegroundColor White
Write-Host ""
Write-Host "Шаг 2: Открываю страницу Actions для проверки workflow..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
Start-Process "https://github.com/AntonRychagov/landing/actions"

Write-Host ""
Write-Host "ПРОВЕРКА:" -ForegroundColor Green
Write-Host "- Убедитесь, что workflow 'Deploy Next.js to GitHub Pages' запущен" -ForegroundColor White
Write-Host "- Дождитесь завершения (зеленая галочка)" -ForegroundColor White
Write-Host "- Если workflow не запустился автоматически, нажмите 'Run workflow'" -ForegroundColor White
Write-Host ""
Write-Host "После завершения workflow ваш сайт будет доступен по адресу:" -ForegroundColor Cyan
Write-Host "https://antonrychagov.github.io/landing/" -ForegroundColor Yellow
Write-Host ""
Write-Host "Нажмите любую клавишу для завершения..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
