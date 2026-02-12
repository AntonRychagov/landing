# Быстрый деплой на GitHub Pages
$repo = "AntonRychagov/landing"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ДЕПЛОЙ НА GITHUB PAGES" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Шаг 1: Открыть настройки Pages
Write-Host "[1/3] Открываю настройки GitHub Pages..." -ForegroundColor Yellow
Start-Process "https://github.com/$repo/settings/pages"
Start-Sleep -Seconds 2

# Шаг 2: Открыть Actions
Write-Host "[2/3] Открываю страницу Actions..." -ForegroundColor Yellow
Start-Process "https://github.com/$repo/actions"
Start-Sleep -Seconds 2

# Шаг 3: Попытка запустить workflow через CLI
Write-Host "[3/3] Попытка запустить workflow..." -ForegroundColor Yellow
$env:Path += ";C:\Program Files\GitHub CLI"

$authCheck = gh auth status 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ GitHub CLI аутентифицирован" -ForegroundColor Green
    
    # Получаем workflow ID
    $workflows = gh workflow list --repo $repo --json id,name 2>&1
    if ($LASTEXITCODE -eq 0) {
        $deployWorkflow = ($workflows | ConvertFrom-Json) | Where-Object { $_.name -like "*Deploy*" }
        if ($deployWorkflow) {
            Write-Host "Запускаю workflow: $($deployWorkflow.name)..." -ForegroundColor Cyan
            gh workflow run $deployWorkflow.id --repo $repo --ref main
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Workflow запущен!" -ForegroundColor Green
            }
        }
    }
} else {
    Write-Host "⚠ GitHub CLI не аутентифицирован" -ForegroundColor Yellow
    Write-Host "  Запустите workflow вручную в открытой вкладке Actions" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ИНСТРУКЦИЯ:" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "В открытой вкладке Settings > Pages:" -ForegroundColor Yellow
Write-Host "  1. Найдите 'Build and deployment'" -ForegroundColor White
Write-Host "  2. Измените Source на 'GitHub Actions'" -ForegroundColor White
Write-Host "  3. Сохраните (если требуется)" -ForegroundColor White
Write-Host ""
Write-Host "В открытой вкладке Actions:" -ForegroundColor Yellow
Write-Host "  1. Найдите 'Deploy Next.js to GitHub Pages'" -ForegroundColor White
Write-Host "  2. Если не запущен - нажмите 'Run workflow'" -ForegroundColor White
Write-Host "  3. Дождитесь завершения (зеленая галочка)" -ForegroundColor White
Write-Host ""
Write-Host "Сайт будет доступен:" -ForegroundColor Green
Write-Host "  https://antonrychagov.github.io/landing/" -ForegroundColor Cyan
Write-Host ""
