Add-Type -AssemblyName System.Drawing

function Color-Grade-Photo {
    param(
        [string]$SourcePath,
        [string]$DestPath,
        [float[][]]$Matrix
    )

    $src = [System.Drawing.Bitmap]::FromFile($SourcePath)
    $dest = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    $cm = New-Object System.Drawing.Imaging.ColorMatrix(,$Matrix)
    $ia = New-Object System.Drawing.Imaging.ImageAttributes
    $ia.SetColorMatrix($cm, [System.Drawing.Imaging.ColorMatrixFlag]::Default, [System.Drawing.Imaging.ColorAdjustType]::Bitmap)

    $rect = New-Object System.Drawing.Rectangle(0, 0, $src.Width, $src.Height)
    $g.DrawImage($src, $rect, 0, 0, $src.Width, $src.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)

    $ia.Dispose()
    $g.Dispose()
    $src.Dispose()

    $dest.Save($DestPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $dest.Dispose()
    Write-Output "Created $DestPath"
}

# 1. Peach Oolong (Warm Golden Peach from Chamomile base: boost orange/red/gold, reduce green)
$peachMatrix = @(
    @(1.15, 0.05, 0.00, 0.00, 0.00),
    @(0.25, 0.95, 0.00, 0.00, 0.00),
    @(0.00, 0.05, 0.85, 0.00, 0.00),
    @(0.00, 0.00, 0.00, 1.00, 0.00),
    @(0.06, 0.02, -0.05, 0.00, 1.00)
)
Color-Grade-Photo -SourcePath "e:\Meliora\assets\images\flavor-chamomile-gold.jpg" `
    -DestPath "e:\Meliora\assets\images\flavor-peach-oolong.jpg" `
    -Matrix $peachMatrix

# 2. Lychee & Jasmine White Tea (Soft white jade / silver needle: lighter, clean bright airy tones)
$jasmineMatrix = @(
    @(0.90, 0.10, 0.10, 0.00, 0.00),
    @(0.15, 1.05, 0.15, 0.00, 0.00),
    @(0.10, 0.15, 1.05, 0.00, 0.00),
    @(0.00, 0.00, 0.00, 1.00, 0.00),
    @(0.08, 0.10, 0.08, 0.00, 1.00)
)
Color-Grade-Photo -SourcePath "e:\Meliora\assets\images\flavor-chamomile-gold.jpg" `
    -DestPath "e:\Meliora\assets\images\flavor-jasmine-lychee.jpg" `
    -Matrix $jasmineMatrix

# 3. Matcha Cố Đô (Vibrant fresh emerald Matcha Green: boost green, tone down pink/red)
$matchaMatrix = @(
    @(0.35, 0.45, 0.10, 0.00, 0.00),
    @(0.10, 1.25, 0.15, 0.00, 0.00),
    @(0.05, 0.35, 0.70, 0.00, 0.00),
    @(0.00, 0.00, 0.00, 1.00, 0.00),
    @(-0.05, 0.12, -0.05, 0.00, 1.00)
)
Color-Grade-Photo -SourcePath "e:\Meliora\assets\images\flavor-chamomile-gold.jpg" `
    -DestPath "e:\Meliora\assets\images\flavor-matcha.jpg" `
    -Matrix $matchaMatrix

# 4. Trái Cây Rừng & Hibiscus (Deep ruby berry red from Rose base: richer crimson ruby saturation)
$hibiscusMatrix = @(
    @(1.25, 0.05, 0.15, 0.00, 0.00),
    @(0.05, 0.75, 0.05, 0.00, 0.00),
    @(0.15, 0.05, 1.15, 0.00, 0.00),
    @(0.00, 0.00, 0.00, 1.00, 0.00),
    @(0.08, -0.04, 0.04, 0.00, 1.00)
)
Color-Grade-Photo -SourcePath "e:\Meliora\assets\images\flavor-rose-berry.jpg" `
    -DestPath "e:\Meliora\assets\images\flavor-hibiscus-berry.jpg" `
    -Matrix $hibiscusMatrix
