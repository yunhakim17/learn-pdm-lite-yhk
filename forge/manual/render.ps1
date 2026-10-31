# PowerPoint로 pptx를 열어 슬라이드마다 PNG로 내보낸다 (렌더 확인용)
param([string]$Pptx, [string]$OutDir)
New-Item -ItemType Directory -Force $OutDir | Out-Null
Get-ChildItem $OutDir -Filter *.png | Remove-Item -Force
$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Open($Pptx, $true, $false, $false)
$i = 0
foreach ($s in $pres.Slides) { $i++; $s.Export((Join-Path $OutDir ("s{0:D2}.png" -f $i)), "PNG", 1280, 720) }
$pres.Close(); $app.Quit()
"exported $i"
