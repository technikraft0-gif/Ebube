$dir = "c:\Users\HP\Downloads\conqueror\public\images\books"
$books = @("clean-code", "pragmatic-programmer", "designing-data-intensive", "ai-engineering", "computer-org")
foreach ($b in $books) {
    Copy-Item "$dir\$b.svg" "$dir\$b.webp" -Force
    Write-Host "Copied $b.svg -> $b.webp"
}
