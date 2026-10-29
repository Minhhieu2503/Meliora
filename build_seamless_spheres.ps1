Add-Type -AssemblyName System.Drawing

function Build-Seamless-Sphere {
    param(
        [string]$BaseTemplatePath,    # Base photo with real background and sphere
        [string]$TextureSourcePath,   # Real botanical texture source
        [string]$OutputPath,
        [int]$HueShift,               # Color tint
        [System.Drawing.Color]$GlowColor,
        [float]$TextureBlendOpacity
    )

    $base = [System.Drawing.Bitmap]::FromFile($BaseTemplatePath)
    $w = $base.Width
    $h = $base.Height

    $output = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($output)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # 1. Draw base photo as foundation
    $g.DrawImage($base, 0, 0, $w, $h)

    # In base photo, the sphere center and radius
    # In flavor-chamomile-gold (1024x1024):
    $cx = [int]($w * 0.495)
    $cy = [int]($h * 0.515)
    $radius = [int]($w * 0.255)
    $diameter = $radius * 2

    # 2. Extract and blend interior botanical texture
    $innerRadius = $radius - 12
    $innerPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $innerPath.AddEllipse(($cx - $innerRadius), ($cy - $innerRadius), ($innerRadius * 2), ($innerRadius * 2))

    $oldClip = $g.Clip
    $g.SetClip($innerPath)

    if (Test-Path $TextureSourcePath) {
        $tex = [System.Drawing.Bitmap]::FromFile($TextureSourcePath)
        $cm = New-Object System.Drawing.Imaging.ColorMatrix
        $cm.Matrix33 = $TextureBlendOpacity
        $ia = New-Object System.Drawing.Imaging.ImageAttributes
        $ia.SetColorMatrix($cm)

        $destRect = New-Object System.Drawing.Rectangle(($cx - $innerRadius), ($cy - $innerRadius), ($innerRadius * 2), ($innerRadius * 2))
        $g.DrawImage($tex, $destRect, 150, 150, ($tex.Width - 300), ($tex.Height - 300), [System.Drawing.GraphicsUnit]::Pixel, $ia)

        $ia.Dispose()
        $tex.Dispose()
    }

    # Apply ambient internal atmospheric color wash
    $colorBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($innerPath)
    $colorBrush.CenterPoint = New-Object System.Drawing.PointF($cx, $cy)
    $colorBrush.CenterColor = [System.Drawing.Color]::FromArgb(90, $GlowColor.R, $GlowColor.G, $GlowColor.B)
    $colorBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(140, $GlowColor.R, $GlowColor.G, $GlowColor.B))
    $g.FillPath($colorBrush, $innerPath)
    $colorBrush.Dispose()

    $innerPath.Dispose()
    $g.Clip = $oldClip

    # 3. Re-enhance 3D glass specular reflections
    $glintPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $glintPath.AddEllipse(($cx - [int]($radius * 0.65)), ($cy - [int]($radius * 0.75)), [int]($radius * 0.7), [int]($radius * 0.45))
    $glintBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($glintPath)
    $glintBrush.CenterColor = [System.Drawing.Color]::FromArgb(160, 255, 255, 255)
    $glintBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 255, 255, 255))
    $g.FillPath($glintBrush, $glintPath)
    $glintBrush.Dispose()
    $glintPath.Dispose()

    # Glass rim refraction ring
    $rimPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 255, 255, 255), 3)
    $g.DrawEllipse($rimPen, ($cx - $radius), ($cy - $radius), $diameter, $diameter)
    $rimPen.Dispose()

    $g.Dispose()
    $base.Dispose()

    $output.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $output.Dispose()
    Write-Output "Successfully built $OutputPath"
}

# 1. Peach & Oolong
Build-Seamless-Sphere -BaseTemplatePath "e:\Meliora\assets\images\flavor_chamomile_gold_1793276486636.jpg" `
    -TextureSourcePath "e:\Meliora\assets\images\hero_tea_bomb_glass_1793276449697.jpg" `
    -OutputPath "e:\Meliora\assets\images\flavor-peach-oolong.jpg" `
    -HueShift 20 `
    -GlowColor ([System.Drawing.Color]::FromArgb(247, 163, 139)) `
    -TextureBlendOpacity 0.45

# 2. Lychee & Jasmine White Tea
Build-Seamless-Sphere -BaseTemplatePath "e:\Meliora\assets\images\flavor_chamomile_gold_1793276486636.jpg" `
    -TextureSourcePath "e:\Meliora\assets\images\flavor_chamomile_gold_1793276486636.jpg" `
    -OutputPath "e:\Meliora\assets\images\flavor-jasmine-lychee.jpg" `
    -HueShift 60 `
    -GlowColor ([System.Drawing.Color]::FromArgb(200, 230, 215)) `
    -TextureBlendOpacity 0.35

# 3. Matcha Cố Đô
Build-Seamless-Sphere -BaseTemplatePath "e:\Meliora\assets\images\flavor_chamomile_gold_1793276486636.jpg" `
    -TextureSourcePath "e:\Meliora\assets\images\hero_tea_bomb_glass_1793276449697.jpg" `
    -OutputPath "e:\Meliora\assets\images\flavor-matcha.jpg" `
    -HueShift 90 `
    -GlowColor ([System.Drawing.Color]::FromArgb(135, 185, 100)) `
    -TextureBlendOpacity 0.50

# 4. Trái Cây Rừng & Hibiscus
Build-Seamless-Sphere -BaseTemplatePath "e:\Meliora\assets\images\flavor_rose_berry_1793276468222.jpg" `
    -TextureSourcePath "e:\Meliora\assets\images\flavor_rose_berry_1793276468222.jpg" `
    -OutputPath "e:\Meliora\assets\images\flavor-hibiscus-berry.jpg" `
    -HueShift 330 `
    -GlowColor ([System.Drawing.Color]::FromArgb(215, 60, 95)) `
    -TextureBlendOpacity 0.40
