$cutoff = (Get-Date).AddHours(-3)
Get-ChildItem 'C:\Users\HP\Downloads' | Where-Object { $_.LastWriteTime -gt $cutoff -and ($_.Extension -eq '.jpeg' -or $_.Extension -eq '.jpg' -or $_.Extension -eq '.png' -or $_.Extension -eq '.webp') } | Sort-Object LastWriteTime -Descending | Select-Object Name, LastWriteTime | Format-Table -AutoSize
