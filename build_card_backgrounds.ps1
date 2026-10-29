Add-Type -AssemblyName System.Drawing

function Create-Card-Background {
    param(
        [string]$OutputPath,
        [System.Drawing.Color]$TopTint,
        [System.Drawing.Color]$AccentGlow,
        [string]$TextureSourcePath,
        [float]$PhotoOpacity = 0.65
    )

    $w = 600
    $h = 820
    $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # 1. Base Cream Tone
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point(0, $h)),
        $TopTint,
        [System.Drawing.Color]::FromArgb(255, 252, 249, 245)
    )
    $g.FillRectangle($bgBrush, 0, 0, $w, $h)
    $bgBrush.Dispose()

    # 2. Draw Corresponding Flavor Botanical Photograph across the upper 70%
    if (Test-Path $TextureSourcePath) {
        $tex = [System.Drawing.Bitmap]::FromFile($TextureSourcePath)
        
        $cm = New-Object System.Drawing.Imaging.ColorMatrix
        $cm.Matrix33 = $PhotoOpacity # Opacity
        # Subtle color saturation boost
        $cm.Matrix00 = 1.15 # R
        $cm.Matrix11 = 1.15 # G
        $cm.Matrix22 = 1.15 # B
        
        $ia = New-Object System.Drawing.Imaging.ImageAttributes
        $ia.SetColorMatrix($cm)

        # Draw botanical image cropped and centered across the card
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, [int]($h * 0.72))
        $srcRect = New-Object System.Drawing.Rectangle(0, 0, $tex.Width, [int]($tex.Height * 0.85))
        $g.DrawImage($tex, $destRect, $srcRect.X, $srcRect.Y, $srcRect.Width, $srcRect.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)

        $ia.Dispose()
        $tex.Dispose()
    }

    # 3. Ambient Vibrant Radial Glow in the Card's Flavor Color
    $glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $glowPath.AddEllipse(-100, -100, [int]($w * 1.4), [int]($h * 0.6))
    $glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
    $glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(110, $AccentGlow.R, $AccentGlow.G, $AccentGlow.B)
    $glowBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 255, 255, 255))
    $g.FillPath($glowBrush, $glowPath)
    $glowBrush.Dispose()
    $glowPath.Dispose()

    # 4. Frosted Glass Veil: Subtle at top, smoothly frosted behind text for 100% legibility
    $blend = New-Object System.Drawing.Drawing2D.ColorBlend(4)
    $blend.Colors = @(
        [System.Drawing.Color]::FromArgb(35, 255, 255, 255),
        [System.Drawing.Color]::FromArgb(100, 255, 255, 255),
        [System.Drawing.Color]::FromArgb(215, 254, 252, 248),
        [System.Drawing.Color]::FromArgb(248, 254, 252, 248)
    )
    $blend.Positions = @(0.0, 0.35, 0.65, 1.0)

    $veilBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point(0, $h)),
        [System.Drawing.Color]::Transparent,
        [System.Drawing.Color]::White
    )
    $veilBrush.InterpolationColors = $blend
    $g.FillRectangle($veilBrush, 0, 0, $w, $h)
    $veilBrush.Dispose()

    # 5. Clean, soft inner border line
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 255, 255, 255), 2)
    $g.DrawRectangle($pen, 1, 1, $w - 2, $h - 2)
    $pen.Dispose()

    $g.Dispose()
    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    Write-Output "Successfully generated: $OutputPath"
}

# 1. Card 1: Hoa Hồng Pháp & Dâu Tây (Rose & Strawberry)
Create-Card-Background -OutputPath "e:\Meliora\assets\images\card-bg-rose.jpg" `
    -TopTint ([System.Drawing.Color]::FromArgb(255, 254, 238, 243)) `
    -AccentGlow ([System.Drawing.Color]::FromArgb(242, 167, 184)) `
    -TextureSourcePath "e:\Meliora\assets\images\flavor-rose-berry.jpg" `
    -PhotoOpacity 0.78

# 2. Card 2: Hoa Cúc Hoàng Kim & Quế Hoa (Chamomile & Osmanthus)
Create-Card-Background -OutputPath "e:\Meliora\assets\images\card-bg-chamomile.jpg" `
    -TopTint ([System.Drawing.Color]::FromArgb(255, 254, 246, 234)) `
    -AccentGlow ([System.Drawing.Color]::FromArgb(246, 178, 107)) `
    -TextureSourcePath "e:\Meliora\assets\images\flavor-chamomile-gold.jpg" `
    -PhotoOpacity 0.78

# 3. Card 3: Đào Mật & Trà Ô Long (Peach & Oolong)
Create-Card-Background -OutputPath "e:\Meliora\assets\images\card-bg-peach.jpg" `
    -TopTint ([System.Drawing.Color]::FromArgb(255, 254, 243, 237)) `
    -AccentGlow ([System.Drawing.Color]::FromArgb(247, 163, 139)) `
    -TextureSourcePath "e:\Meliora\assets\images\flavor-peach-oolong.jpg" `
    -PhotoOpacity 0.78

# 4. Card 4: Vải Thiều & Bạch Trà Hoa Nhài (Jasmine & Lychee)
Create-Card-Background -OutputPath "e:\Meliora\assets\images\card-bg-jasmine.jpg" `
    -TopTint ([System.Drawing.Color]::FromArgb(255, 245, 250, 242)) `
    -AccentGlow ([System.Drawing.Color]::FromArgb(168, 198, 134)) `
    -TextureSourcePath "e:\Meliora\assets\images\flavor-jasmine-lychee.jpg" `
    -PhotoOpacity 0.78

# 5. Card 5: Matcha Cố Đô & Gạo Lứt (Matcha & Roasted Rice)
Create-Card-Background -OutputPath "e:\Meliora\assets\images\card-bg-matcha.jpg" `
    -TopTint ([System.Drawing.Color]::FromArgb(255, 242, 250, 237)) `
    -AccentGlow ([System.Drawing.Color]::FromArgb(139, 168, 105)) `
    -TextureSourcePath "e:\Meliora\assets\images\flavor-matcha.jpg" `
    -PhotoOpacity 0.78

# 6. Card 6: Trái Cây Rừng & Hibiscus (Forest Berries & Hibiscus)
Create-Card-Background -OutputPath "e:\Meliora\assets\images\card-bg-hibiscus.jpg" `
    -TopTint ([System.Drawing.Color]::FromArgb(255, 254, 238, 244)) `
    -AccentGlow ([System.Drawing.Color]::FromArgb(209, 90, 117)) `
    -TextureSourcePath "e:\Meliora\assets\images\flavor-hibiscus-berry.jpg" `
    -PhotoOpacity 0.78
