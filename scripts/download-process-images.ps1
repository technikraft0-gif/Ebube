$stages = @(
    @{ name = "discovery"; url = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80" },
    @{ name = "planning"; url = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80" },
    @{ name = "development"; url = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" },
    @{ name = "delivery"; url = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" }
)

foreach ($s in $stages) {
    $out = "public/images/process/$($s.name).jpg"
    try {
        Invoke-WebRequest -Uri $s.url -OutFile $out -TimeoutSec 15
        $size = (Get-Item $out).Length
        Write-Host "Downloaded $($s.name).jpg ($size bytes)"
    } catch {
        Write-Host ("Failed to download " + $s.name + ": " + $_)
    }
}
