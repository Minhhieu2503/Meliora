Add-Type -AssemblyName System.Drawing

function Create-FlavorSphere {
    param(
        [string]$OutputPath,
        [System.Drawing.Color]$ThemeColor,
        [System.Drawing.Color]$SecondaryColor,
        [string]$FlavorType
    )

    $width = 600
    $height = 600
    $bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # 1. Warm Ivory background (#FAF6EF to #F5EFE6)
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point($width, $height)),
        [System.Drawing.Color]::FromArgb(255, 252, 248, 242),
        [System.Drawing.Color]::FromArgb(255, 245, 239, 230)
    )
    $g.FillRectangle($bgBrush, 0, 0, $width, $height)
    $bgBrush.Dispose()

    # Ambient soft glow under the card
    $glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $glowPath.AddEllipse(120, 120, 360, 360)
    $glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
    $glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(85, $ThemeColor.R, $ThemeColor.G, $ThemeColor.B)
    $glowBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 250, 246, 239))
    $g.FillPath($glowBrush, $glowPath)
    $glowBrush.Dispose()
    $glowPath.Dispose()

    # 2. Base Coaster / Shadow (Ivory stone disk)
    $coasterBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 420)),
        (New-Object System.Drawing.Point(0, 520)),
        [System.Drawing.Color]::FromArgb(255, 242, 236, 226),
        [System.Drawing.Color]::FromArgb(255, 228, 220, 208)
    )
    # Drop shadow under coaster
    $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40, 62, 44, 35))
    $g.FillEllipse($shadowBrush, 110, 465, 380, 75)
    $shadowBrush.Dispose()
    # Coaster body
    $g.FillEllipse($coasterBrush, 120, 440, 360, 80)
    $coasterBrush.Dispose()

    # Contact shadow under the sphere
    $sphereShadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(70, 50, 35, 25))
    $g.FillEllipse($sphereShadowBrush, 190, 435, 220, 45)
    $sphereShadowBrush.Dispose()

    # 3. Sphere Center & Radius
    $cx = 300
    $cy = 300
    $radius = 185
    $diameter = $radius * 2

    # Draw sphere base with glass refraction background
    $spherePath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $spherePath.AddEllipse(($cx - $radius), ($cy - $radius), $diameter, $diameter)

    $sphereGrad = New-Object System.Drawing.Drawing2D.PathGradientBrush($spherePath)
    $sphereGrad.CenterPoint = New-Object System.Drawing.PointF(($cx - 45), ($cy - 50))
    $sphereGrad.CenterColor = [System.Drawing.Color]::FromArgb(140, 255, 255, 255)
    $sphereGrad.SurroundColors = @([System.Drawing.Color]::FromArgb(180, $ThemeColor.R, $ThemeColor.G, $ThemeColor.B))
    $g.FillPath($sphereGrad, $spherePath)
    $sphereGrad.Dispose()

    # Composite botanical elements based on FlavorType using crops and layered artwork
    $heroImg = [System.Drawing.Bitmap]::FromFile("e:\Meliora\assets\images\hero-tea-bomb.jpg")
    $roseImg = [System.Drawing.Bitmap]::FromFile("e:\Meliora\assets\images\flavor-rose-berry.jpg")
    $chamoImg = [System.Drawing.Bitmap]::FromFile("e:\Meliora\assets\images\flavor-chamomile-gold.jpg")

    $oldClip = $g.Clip
    $g.SetClip($spherePath)

    if ($FlavorType -eq "peach") {
        # Peach Oolong: Peach slices & golden tea leaves
        # Crop from hero image (peach slice area) and chamomile
        $g.DrawImage($heroImg, 
            (New-Object System.Drawing.Rectangle(150, 160, 300, 300)),
            (New-Object System.Drawing.Rectangle(200, 240, 550, 550)),
            [System.Drawing.GraphicsUnit]::Pixel
        )
        # Warm golden apricot color overlay
        $tintBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(55, 247, 163, 139))
        $g.FillEllipse($tintBrush, ($cx - $radius), ($cy - $radius), $diameter, $diameter)
        $tintBrush.Dispose()
    }
    elseif ($FlavorType -eq "jasmine") {
        # Lychee & Jasmine White Tea
        $g.DrawImage($chamoImg, 
            (New-Object System.Drawing.Rectangle(150, 150, 300, 300)),
            (New-Object System.Drawing.Rectangle(240, 260, 480, 480)),
            [System.Drawing.GraphicsUnit]::Pixel
        )
        # Soft jade white wash overlay
        $tintBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(60, 215, 230, 205))
        $g.FillEllipse($tintBrush, ($cx - $radius), ($cy - $radius), $diameter, $diameter)
        $tintBrush.Dispose()
    }
    elseif ($FlavorType -eq "matcha") {
        # Matcha Cố Đô: Fresh green tea leaves and sencha
        $g.DrawImage($heroImg, 
            (New-Object System.Drawing.Rectangle(150, 150, 300, 300)),
            (New-Object System.Drawing.Rectangle(320, 350, 420, 420)),
            [System.Drawing.GraphicsUnit]::Pixel
        )
        # Matcha deep green gradient
        $tintBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(85, 130, 175, 95))
        $g.FillEllipse($tintBrush, ($cx - $radius), ($cy - $radius), $diameter, $diameter)
        $tintBrush.Dispose()
    }
    elseif ($FlavorType -eq "hibiscus") {
        # Wild Berry & Hibiscus: Ruby petals and berries
        $g.DrawImage($roseImg, 
            (New-Object System.Drawing.Rectangle(140, 140, 320, 320)),
            (New-Object System.Drawing.Rectangle(230, 260, 460, 460)),
            [System.Drawing.GraphicsUnit]::Pixel
        )
        # Ruby crimson overlay
        $tintBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(75, 210, 60, 95))
        $g.FillEllipse($tintBrush, ($cx - $radius), ($cy - $radius), $diameter, $diameter)
        $tintBrush.Dispose()
    }

    $heroImg.Dispose()
    $roseImg.Dispose()
    $chamoImg.Dispose()

    # Micro Air Bubbles inside the Isomalt
    $rnd = New-Object System.Random(42)
    for ($i = 0; $i -lt 28; $i++) {
        $bx = $cx + $rnd.Next(-140, 140)
        $by = $cy + $rnd.Next(-130, 140)
        $bsize = $rnd.Next(4, 12)
        $bubbleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 255, 255, 255))
        $g.FillEllipse($bubbleBrush, $bx, $by, $bsize, $bsize)
        $bubbleBrush.Dispose()
    }

    # Reset clip to draw surface glass refraction and highlights
    $g.Clip = $oldClip

    # 4. 3D Glass Specular Reflection Highlight (Top-left crescent / curved glow)
    $highlightPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $highlightPath.AddEllipse(($cx - 130), ($cy - 145), 180, 110)
    $highlightBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($highlightPath)
    $highlightBrush.CenterColor = [System.Drawing.Color]::FromArgb(210, 255, 255, 255)
    $highlightBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 255, 255, 255))
    $g.FillPath($highlightBrush, $highlightPath)
    $highlightBrush.Dispose()
    $highlightPath.Dispose()

    # Sharp specular glint
    $glintBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 255, 255, 255))
    $g.FillEllipse($glintBrush, ($cx - 75), ($cy - 105), 32, 18)
    $glintBrush.Dispose()

    # Glass rim outline glow
    $rimPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(210, 255, 255, 255), 2.5)
    $g.DrawEllipse($rimPen, ($cx - $radius), ($cy - $radius), $diameter, $diameter)
    $rimPen.Dispose()

    $spherePath.Dispose()
    $g.Dispose()

    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    Write-Output "Generated $OutputPath"
}

Create-FlavorSphere -OutputPath "e:\Meliora\assets\images\flavor-peach-oolong.jpg" `
    -ThemeColor ([System.Drawing.Color]::FromArgb(247, 163, 139)) `
    -SecondaryColor ([System.Drawing.Color]::FromArgb(246, 178, 107)) `
    -FlavorType "peach"

Create-FlavorSphere -OutputPath "e:\Meliora\assets\images\flavor-jasmine-lychee.jpg" `
    -ThemeColor ([System.Drawing.Color]::FromArgb(215, 230, 205)) `
    -SecondaryColor ([System.Drawing.Color]::FromArgb(168, 198, 134)) `
    -FlavorType "jasmine"

Create-FlavorSphere -OutputPath "e:\Meliora\assets\images\flavor-matcha.jpg" `
    -ThemeColor ([System.Drawing.Color]::FromArgb(168, 198, 134)) `
    -SecondaryColor ([System.Drawing.Color]::FromArgb(108, 150, 75)) `
    -FlavorType "matcha"

Create-FlavorSphere -OutputPath "e:\Meliora\assets\images\flavor-hibiscus-berry.jpg" `
    -ThemeColor ([System.Drawing.Color]::FromArgb(229, 140, 157)) `
    -SecondaryColor ([System.Drawing.Color]::FromArgb(180, 50, 80)) `
    -FlavorType "hibiscus"
