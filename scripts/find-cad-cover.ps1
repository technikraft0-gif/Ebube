$isbns = @(
    "9781119777984",
    "9781119300571",
    "9780073522647",
    "9780132484374",
    "9781585038039",
    "9780131499355",
    "9780135000687",
    "9781585039272"
)

foreach ($isbn in $isbns) {
    $url = "https://covers.openlibrary.org/b/isbn/$isbn-L.jpg"
    try {
        $out = "public/images/books/test-cad-$isbn.jpg"
        Invoke-WebRequest -Uri $url -OutFile $out -TimeoutSec 10 -ErrorAction Stop
        $len = (Get-Item $out).Length
        Write-Host "ISBN $isbn size: $len"
        if ($len -gt 5000) {
            Copy-Item $out "public/images/books/solid-modeling.jpg" -Force
            Write-Host "FOUND VALID CAD COVER: $isbn ($len bytes)"
            break
        } else {
            Remove-Item $out -Force
        }
    } catch {
        Write-Host "ISBN $isbn failed: $_"
    }
}
