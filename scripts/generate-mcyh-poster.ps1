$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$assetDir = Join-Path $PSScriptRoot '..\public\assets'
$logoPath = Join-Path $assetDir 'mcyh-logo-source.png'
$outputPath = Join-Path $assetDir 'mcyh-logo-poster.png'

$width = 1600
$height = 1000
$bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

try {
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $canvas = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
  $background = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $canvas,
    [System.Drawing.ColorTranslator]::FromHtml('#04070b'),
    [System.Drawing.ColorTranslator]::FromHtml('#210711'),
    138
  )
  $graphics.FillRectangle($background, $canvas)
  $background.Dispose()

  for ($i = 0; $i -lt 8; $i++) {
    $alpha = [Math]::Max(2, 16 - ($i * 2))
    $glowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($alpha, 211, 19, 69))
    $inset = 120 + ($i * 52)
    $graphics.FillEllipse($glowBrush, $inset, 70 + ($i * 22), $width - ($inset * 2), 760 - ($i * 44))
    $glowBrush.Dispose()
  }

  $linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(20, 255, 255, 255), 1)
  for ($x = -500; $x -lt 1900; $x += 112) {
    $graphics.DrawLine($linePen, $x, 0, $x + 520, $height)
  }
  $linePen.Dispose()

  $framePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(58, 255, 255, 255), 2)
  $graphics.DrawRectangle($framePen, 62, 62, $width - 124, $height - 124)
  $framePen.Dispose()

  $accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#d31345'))
  $graphics.FillRectangle($accentBrush, 82, 82, 74, 8)
  $graphics.FillRectangle($accentBrush, 1412, 82, 42, 42)

  $labelFont = New-Object System.Drawing.Font('Arial', 16, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $metaFont = New-Object System.Drawing.Font('Arial', 18, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $smallFont = New-Object System.Drawing.Font('Arial', 13, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(232, 244, 245, 240))
  $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150, 244, 245, 240))

  $graphics.DrawString('MCYH / BRAND SYSTEM 02', $labelFont, $whiteBrush, 82, 111)
  $graphics.DrawString('MATERIAL TECHNOLOGY', $smallFont, $mutedBrush, 82, 142)

  $rightFormat = New-Object System.Drawing.StringFormat
  $rightFormat.Alignment = [System.Drawing.StringAlignment]::Far
  $graphics.DrawString('02 / 08', $labelFont, $whiteBrush, (New-Object System.Drawing.RectangleF(1180, 111, 274, 26)), $rightFormat)

  $logo = [System.Drawing.Image]::FromFile($logoPath)
  try {
    $logoWidth = 1120
    $logoHeight = [int]($logoWidth * $logo.Height / $logo.Width)
    $logoX = [int](($width - $logoWidth) / 2)
    $logoY = 302
    $graphics.DrawImage($logo, $logoX, $logoY, $logoWidth, $logoHeight)
  }
  finally {
    $logo.Dispose()
  }

  $rulePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(94, 255, 255, 255), 1)
  $graphics.DrawLine($rulePen, 240, 724, 1360, 724)
  $rulePen.Dispose()

  $graphics.DrawString('MCYH / PROFESSIONAL GROUT SYSTEM', $metaFont, $whiteBrush, 240, 755)
  $graphics.DrawString('MATERIAL TECHNOLOGY / SHANGHAI', $smallFont, $mutedBrush, 240, 790)
  $graphics.DrawString('BRAND WEBSITE / 2026', $smallFont, $mutedBrush, (New-Object System.Drawing.RectangleF(1040, 755, 320, 24)), $rightFormat)

  $rightFormat.Dispose()
  $labelFont.Dispose()
  $metaFont.Dispose()
  $smallFont.Dispose()
  $whiteBrush.Dispose()
  $mutedBrush.Dispose()
  $accentBrush.Dispose()

  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
}
finally {
  $graphics.Dispose()
  $bitmap.Dispose()
}

Write-Output $outputPath
