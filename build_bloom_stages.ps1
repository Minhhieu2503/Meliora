Add-Type -AssemblyName System.Drawing

function Create-Bloom-Stages {
    $rose = [System.Drawing.Bitmap]::FromFile("e:\Meliora\assets\images\flavor_rose_berry_1793276468222.jpg")
    $hero = [System.Drawing.Bitmap]::FromFile("e:\Meliora\assets\images\hero_tea_bomb_glass_1793276449697.jpg")
    $chamo = [System.Drawing.Bitmap]::FromFile("e:\Meliora\assets\images\flavor_chamomile_gold_1793276486636.jpg")

    $size = 640

    # Helper to create cropped square
    function Crop-Center($bmp, $srcRect, $outSize) {
        $dest = New-Object System.Drawing.Bitmap($outSize, $outSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $g = [System.Drawing.Graphics]::FromImage($dest)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $outSize, $outSize)
        $g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()
        return $dest
    }

    # STAGE 1: Pristine intact sphere (tightly closed flowers, glass refraction shell)
    # Crop around the sphere in flavor_rose_berry
    $rect1 = New-Object System.Drawing.Rectangle(200, 240, 580, 580)
    $stage1 = Crop-Center $rose $rect1 $size
    $stage1.Save("e:\Meliora\assets\images\bloom-stage-1.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $stage1.Dispose()
    Write-Output "Stage 1 created"

    # STAGE 2: Dropped in hot water - bubbles forming, initial thermal water glow
    $stage2 = Crop-Center $rose $rect1 $size
    $g2 = [System.Drawing.Graphics]::FromImage($stage2)
    $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    # Add water immersion shimmer and micro air bubbles
    $rnd = New-Object System.Random(123)
    for ($i = 0; $i -lt 65; $i++) {
        $bx = $rnd.Next(60, 580)
        $by = $rnd.Next(80, 560)
        $bs = $rnd.Next(4, 14)
        $bBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 255, 255, 255))
        $g2.FillEllipse($bBrush, $bx, $by, $bs, $bs)
        $bBrush.Dispose()
        # bubble specular glint
        $glintBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
        $g2.FillEllipse($glintBrush, $bx + 1, $by + 1, [Math]::Max(2, [int]($bs * 0.3)), [Math]::Max(2, [int]($bs * 0.3)))
        $glintBrush.Dispose()
    }
    # Warm water immersion aura
    $auraBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 246, 178, 107))
    $g2.FillRectangle($auraBrush, 0, 0, $size, $size)
    $auraBrush.Dispose()
    $g2.Dispose()
    $stage2.Save("e:\Meliora\assets\images\bloom-stage-2.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $stage2.Dispose()
    Write-Output "Stage 2 created"

    # STAGE 3: Shell melting, petals starting to loosen and expand outward
    # Blend 50% rose sphere with 50% blooming hero cup
    $rectHero = New-Object System.Drawing.Rectangle(180, 220, 640, 640)
    $heroCrop = Crop-Center $hero $rectHero $size

    $stage3 = Crop-Center $rose $rect1 $size
    $g3 = [System.Drawing.Graphics]::FromImage($stage3)
    $g3.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g3.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    # Blend hero bloom at 55% opacity
    $cm3 = New-Object System.Drawing.Imaging.ColorMatrix
    $cm3.Matrix33 = 0.55
    $ia3 = New-Object System.Drawing.Imaging.ImageAttributes
    $ia3.SetColorMatrix($cm3)
    $g3.DrawImage($heroCrop, (New-Object System.Drawing.Rectangle(0, 0, $size, $size)), 0, 0, $size, $size, [System.Drawing.GraphicsUnit]::Pixel, $ia3)
    $ia3.Dispose()

    # Effervescent bubbles swirling around
    for ($i = 0; $i -lt 85; $i++) {
        $bx = $rnd.Next(40, 600)
        $by = $rnd.Next(50, 590)
        $bs = $rnd.Next(4, 16)
        $bBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 255, 255, 255))
        $g3.FillEllipse($bBrush, $bx, $by, $bs, $bs)
        $bBrush.Dispose()
    }
    $g3.Dispose()
    $stage3.Save("e:\Meliora\assets\images\bloom-stage-3.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $stage3.Dispose()
    $heroCrop.Dispose()
    Write-Output "Stage 3 created"

    # STAGE 4: Full magnificent bloom from hero photography
    $stage4 = Crop-Center $hero (New-Object System.Drawing.Rectangle(150, 180, 700, 700)) $size
    $stage4.Save("e:\Meliora\assets\images\bloom-stage-4.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $stage4.Dispose()
    Write-Output "Stage 4 created"

    $rose.Dispose()
    $hero.Dispose()
    $chamo.Dispose()
}

Create-Bloom-Stages
