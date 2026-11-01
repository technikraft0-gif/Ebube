$dir = "c:\Users\HP\Downloads\conqueror\public\images\books"

Copy-Item "$dir\test-clean-code.jpg" "$dir\clean-code.jpg" -Force
Copy-Item "$dir\test-ai.jpg" "$dir\ai-engineering.jpg" -Force
Copy-Item "$dir\test-comp-org.jpg" "$dir\computer-org.jpg" -Force
Copy-Item "$dir\test-ddia.jpg" "$dir\designing-data-intensive.jpg" -Force
Copy-Item "$dir\test-embedded.jpg" "$dir\embedded-systems.jpg" -Force
# solid-modeling.jpg is already there, but ensure it exists

# Clean up temporary test files
Get-ChildItem "$dir\test-*" | Remove-Item -Force

Get-ChildItem "$dir\*.jpg" | Select-Object Name, Length | Format-Table -AutoSize
