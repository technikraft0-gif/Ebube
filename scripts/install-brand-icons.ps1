$icons = @(
    @{ name = "astro"; file = "astro.svg"; color = "#BC52EE" },
    @{ name = "c"; file = "c.svg"; color = "#00599C" },
    @{ name = "cplusplus"; file = "cplusplus.svg"; color = "#00599C" },
    @{ name = "mui"; file = "materialui.svg"; color = "#007FFF" },
    @{ name = "supabase"; file = "supabase.svg"; color = "#3FCF8E" },
    @{ name = "firebase"; file = "firebase.svg"; color = "#FFA611" }
)

foreach ($i in $icons) {
    $url = "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/$($i.name).svg"
    try {
        $raw = (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
        # Add fill attribute
        if ($raw -match 'fill=') {
            $styled = $raw -replace 'fill="[^"]*"', ('fill="' + $i.color + '"')
        } else {
            $styled = $raw -replace '<svg ', ('<svg fill="' + $i.color + '" ')
        }
        $out = "public/icons/brands/$($i.file)"
        Set-Content -Path $out -Value $styled -Encoding utf8
        Write-Host "Updated $($i.file) with fill $($i.color)"
    } catch {
        Write-Host ("Failed: " + $i.name + " " + $_)
    }
}
