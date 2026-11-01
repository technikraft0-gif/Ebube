$icons = @(
    "astro",
    "c",
    "cplusplus",
    "mui",
    "supabase",
    "firebase"
)

foreach ($icon in $icons) {
    $url = "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/$icon.svg"
    try {
        $content = (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
        Write-Host "Found $icon.svg: length $($content.Length)"
    } catch {
        Write-Host ("Failed to fetch " + $icon + ": " + $_)
    }
}
