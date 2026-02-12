# Скрипт для проверки статуса деплоя
$repo = "AntonRychagov/landing"
$apiUrl = "https://api.github.com/repos/$repo"

Write-Host "Проверка статуса репозитория..." -ForegroundColor Cyan

# Проверка последних workflow runs
Write-Host "`nПроверка последних запусков workflow..." -ForegroundColor Yellow
try {
    $workflows = Invoke-RestMethod -Uri "$apiUrl/actions/runs?per_page=5" -Method Get -ErrorAction Stop
    foreach ($run in $workflows.workflow_runs) {
        $status = $run.status
        $conclusion = $run.conclusion
        $name = $run.name
        $created = $run.created_at
        
        $color = if ($conclusion -eq "success") { "Green" } 
                 elseif ($conclusion -eq "failure") { "Red" }
                 else { "Yellow" }
        
        Write-Host "  Workflow: $name" -ForegroundColor White
        Write-Host "  Статус: $status | Результат: $conclusion" -ForegroundColor $color
        Write-Host "  Создан: $created" -ForegroundColor Gray
        Write-Host "  URL: $($run.html_url)" -ForegroundColor Cyan
        Write-Host ""
    }
} catch {
    Write-Host "Не удалось получить информацию о workflow. Возможно, нужна аутентификация." -ForegroundColor Red
    Write-Host "Ошибка: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nДля полной автоматизации нужен GitHub Personal Access Token." -ForegroundColor Yellow
Write-Host "Откройте: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "Создайте токен с правами: repo, workflow" -ForegroundColor White
