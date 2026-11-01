$base = "c:\Users\HP\Downloads\conqueror"
Set-Location $base

# Profile photos
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.58.30 AM.jpeg" -Destination "$base\public\images\me2.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.58.35 AM.jpeg" -Destination "$base\public\images\me3.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.58.32 AM (1).jpeg" -Destination "$base\public\images\about\ebube-portrait.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.58.32 AM (1).jpeg" -Destination "$base\public\images\about\victor-editorial-cutout.jpeg" -Force

# Gallery photos
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.50.53 AM.jpeg" -Destination "$base\public\images\gallery\ebube-pool-skyline.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.58.33 AM.jpeg" -Destination "$base\public\images\gallery\ebube-studio-chair.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.58.33 AM (1).jpeg" -Destination "$base\public\images\gallery\ebube-denim-style.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.58.34 AM.jpeg" -Destination "$base\public\images\gallery\ebube-phone-quote.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.50.50 AM.jpeg" -Destination "$base\public\images\gallery\ebube-football-pitch.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.50.52 AM.jpeg" -Destination "$base\public\images\gallery\ebube-football-team.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.58.36 AM.jpeg" -Destination "$base\public\images\gallery\ebube-laptop-book.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\WhatsApp Image 2026-10-30 at 8.58.36 AM (1).jpeg" -Destination "$base\public\images\gallery\ebube-book-keyboard.jpeg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\UNIUYO.jpg" -Destination "$base\public\images\gallery\uniuyo-campus.jpg" -Force
Copy-Item -LiteralPath "$base\public\images\uploaded\UNIUYO-LOGO.jpg" -Destination "$base\public\images\testimonials\logos\uniuyo.jpg" -Force

Write-Host "All images copied successfully!"
Get-ChildItem "$base\public\images\gallery\" | Select-Object Name
