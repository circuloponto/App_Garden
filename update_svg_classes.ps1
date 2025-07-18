$svgFolder = "c:\Users\35191\Contacts\Desktop\gardenApp-main\src\assets\SVGs\trichordsUnity"
$svgFiles = Get-ChildItem -Path $svgFolder -Filter "*.svg"

foreach ($file in $svgFiles) {
    $filePath = $file.FullName
    $content = Get-Content -Path $filePath -Raw
    
    # Replace purple paths with class="trichord_electron" added
    $updatedContent = $content -replace '(stroke="#9c36b5" stroke-width="4" fill="none")', 'class="trichord_electron" stroke="#9c36b5" stroke-width="4" fill="none"'
    
    # Don't add duplicate classes
    $updatedContent = $updatedContent -replace 'class="trichord_electron" class="trichord_electron"', 'class="trichord_electron"'
    
    # Write the updated content back to the file
    Set-Content -Path $filePath -Value $updatedContent
    
    Write-Host "Updated $($file.Name)"
}

Write-Host "All SVG files have been updated!"
