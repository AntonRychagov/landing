# Автоматический деплой на GitHub Pages
$repo = "AntonRychagov/landing"
$workflowFile = ".github/workflows/deploy.yml"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Автоматический деплой на GitHub Pages" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка аутентификации
Write-Host "Проверка аутентификации GitHub..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ОШИБКА: Необходима аутентификация GitHub CLI" -ForegroundColor Red
    Write-Host "Запустите: gh auth login --web" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Аутентификация успешна" -ForegroundColor Green
Write-Host ""

# Получение workflow ID
Write-Host "Поиск workflow..." -ForegroundColor Yellow
$workflows = gh workflow list --repo $repo --json id,name,path
$deployWorkflow = ($workflows | ConvertFrom-Json) | Where-Object { $_.name -like "*Deploy*" -or $_.path -eq $workflowFile }

if (-not $deployWorkflow) {
    Write-Host "ОШИБКА: Workflow не найден" -ForegroundColor Red
    exit 1
}

$workflowId = $deployWorkflow.id
$workflowName = $deployWorkflow.name
Write-Host "✓ Найден workflow: $workflowName (ID: $workflowId)" -ForegroundColor Green
Write-Host ""

# Запуск workflow
Write-Host "Запуск workflow..." -ForegroundColor Yellow
$runResult = gh workflow run $workflowId --repo $repo --ref main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Workflow запущен успешно" -ForegroundColor Green
} else {
    Write-Host "ОШИБКА при запуске workflow:" -ForegroundColor Red
    Write-Host $runResult -ForegroundColor Red
    exit 1
}
Write-Host ""

# Ожидание запуска
Write-Host "Ожидание запуска workflow (5 секунд)..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Получение статуса последнего запуска
Write-Host "Проверка статуса деплоя..." -ForegroundColor Yellow
$runs = gh run list --repo $repo --workflow $workflowId --limit 1 --json status,conclusion,url,createdAt
$latestRun = ($runs | ConvertFrom-Json) | Select-Object -First 1

if ($latestRun) {
    Write-Host "Последний запуск:" -ForegroundColor Cyan
    Write-Host "  Статус: $($latestRun.status)" -ForegroundColor White
    Write-Host "  Результат: $($latestRun.conclusion)" -ForegroundColor $(if ($latestRun.conclusion -eq "success") { "Green" } else { "Yellow" })
    Write-Host "  URL: $($latestRun.url)" -ForegroundColor Cyan
    Write-Host "  Создан: $($latestRun.createdAt)" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "Открываю страницу workflow в браузере..." -ForegroundColor Yellow
    Start-Process $latestRun.url
} else {
    Write-Host "Информация о запусках недоступна" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ВАЖНО: Проверьте настройки GitHub Pages" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Убедитесь, что в настройках репозитория:" -ForegroundColor White
Write-Host "  Settings > Pages > Source = 'GitHub Actions'" -ForegroundColor Yellow
Write-Host ""
Write-Host "Если Source еще не изменен:" -ForegroundColor White
Start-Process "https://github.com/$repo/settings/pages"
Write-Host "  Откройте: https://github.com/$repo/settings/pages" -ForegroundColor Cyan
Write-Host "  Измените Source на 'GitHub Actions'" -ForegroundColor Yellow
Write-Host ""
Write-Host "После завершения workflow сайт будет доступен:" -ForegroundColor Green
Write-Host "  https://antonrychagov.github.io/landing/" -ForegroundColor Cyan
Write-Host ""
