$base = "c:\Users\HP\Downloads\conqueror"

# Hero portrait - new studio shot
Copy-Item -LiteralPath 'C:\Users\HP\Downloads\WhatsApp Image 2026-10-30 at 11.51.27 AM.jpeg' -Destination "$base\public\images\hero\ebube-hero-portrait.jpeg" -Force

Write-Host "Hero portrait copied!"
