# Generate Manifest Script for Documentation Viewer
# This script scans the site/materials directory and creates a manifest.json in the site folder
# Run this script whenever you add/remove/rename files or folders

param(
    [string]$SourcePath = "..\site\materials",
    [string]$OutputPath = "..\site\manifest.json"
)

# Folders and files to ignore
$IgnoreFolders = @("web-view", ".git", "node_modules", ".vs", ".vscode", "bin", "obj")
$IgnoreFiles = @(".gitignore", ".gitkeep", ".DS_Store", "Thumbs.db")
$IncludeExtensions = @(".md")

function Get-TreeStructure {
    param(
        [string]$Path,
        [string]$RelativePath = ""
    )
    
    $items = [System.Collections.ArrayList]@()
    
    # Get directories first (sorted)
    $directories = Get-ChildItem -Path $Path -Directory | 
        Where-Object { $_.Name -notin $IgnoreFolders } |
        Sort-Object Name
    
    foreach ($dir in $directories) {
        $dirRelativePath = if ($RelativePath) { "$RelativePath/$($dir.Name)" } else { $dir.Name }
        $children = Get-TreeStructure -Path $dir.FullName -RelativePath $dirRelativePath
        
        # Only add folder if it has children (md files or folders with md files)
        if ($children.Count -gt 0) {
            [void]$items.Add(@{
                name = $dir.Name
                type = "folder"
                path = $dirRelativePath
                children = @($children)
            })
        }
    }
    
    # Get files (sorted)
    $files = Get-ChildItem -Path $Path -File |
        Where-Object { 
            $_.Name -notin $IgnoreFiles -and 
            $_.Extension -in $IncludeExtensions 
        } |
        Sort-Object Name
    
    foreach ($file in $files) {
        $fileRelativePath = if ($RelativePath) { "$RelativePath/$($file.Name)" } else { $file.Name }
        [void]$items.Add(@{
            name = $file.Name
            type = "file"
            path = $fileRelativePath
        })
    }
    
    return @($items)
}

# Resolve paths relative to script location
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$SourceFullPath = Join-Path $ScriptDir $SourcePath | Resolve-Path
$OutputFullPath = Join-Path $ScriptDir $OutputPath
Write-Host "Scanning: $SourceFullPath" -ForegroundColor Cyan

# Generate tree structure
$treeStructure = Get-TreeStructure -Path $SourceFullPath

# Convert to JSON
$json = $treeStructure | ConvertTo-Json -Depth 10

# Write to file
$json | Out-File -FilePath $OutputFullPath -Encoding UTF8

Write-Host ""
Write-Host "Manifest generated successfully!" -ForegroundColor Green
Write-Host "Output: $OutputFullPath" -ForegroundColor Gray
Write-Host ""
Write-Host "Found:" -ForegroundColor Yellow

# Count items
function Count-Items {
    param($Items)
    $folders = 0
    $files = 0
    foreach ($item in $Items) {
        if ($item.type -eq "folder") {
            $folders++
            $result = Count-Items -Items $item.children
            $folders += $result.folders
            $files += $result.files
        } else {
            $files++
        }
    }
    return @{ folders = $folders; files = $files }
}

$counts = Count-Items -Items $treeStructure
Write-Host "  - $($counts.folders) folders" -ForegroundColor Gray
Write-Host "  - $($counts.files) files" -ForegroundColor Gray
Write-Host ""
Write-Host "Run a local web server to view the documentation:" -ForegroundColor Yellow
Write-Host "  npx serve -p 8888" -ForegroundColor Gray
Write-Host "  # Then open: http://localhost:8888" -ForegroundColor Gray
