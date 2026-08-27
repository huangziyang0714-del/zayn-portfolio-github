from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


WIDTH, HEIGHT = 1536, 2048
SEED = 260716
OUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "about-concept-art.webp"


def main():
    rng = np.random.default_rng(SEED)
    base = np.zeros((HEIGHT, WIDTH, 3), dtype=np.int16)
    base[:] = (4, 16, 22)
    noise = rng.normal(0, 8, (HEIGHT, WIDTH, 1)).astype(np.int16)
    vignette_x = np.abs(np.linspace(-1, 1, WIDTH))[None, :, None]
    vignette_y = np.abs(np.linspace(-1, 1, HEIGHT))[:, None, None]
    vignette = ((vignette_x + vignette_y) * 7).astype(np.int16)
    base = np.clip(base + noise - vignette, 0, 255).astype(np.uint8)
    image = Image.fromarray(base, "RGB").convert("RGBA")

    grid = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(grid)
    for x in range(0, WIDTH, 96):
        draw.line((x, 0, x, HEIGHT), fill=(56, 232, 255, 24), width=2)
    for y in range(0, HEIGHT, 96):
        draw.line((0, y, WIDTH, y), fill=(56, 232, 255, 18), width=2)

    vanishing = (WIDTH // 2, int(HEIGHT * 0.43))
    for x in range(-WIDTH, WIDTH * 2, 118):
        draw.line((vanishing[0], vanishing[1], x, HEIGHT), fill=(223, 255, 0, 33), width=2)
    for y in range(vanishing[1], HEIGHT, 142):
        spread = int((y - vanishing[1]) * 1.4)
        draw.line((vanishing[0] - spread, y, vanishing[0] + spread, y), fill=(56, 232, 255, 30), width=2)
    image = Image.alpha_composite(image, grid)

    planes = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(planes)
    draw.polygon([(120, 170), (1040, 40), (1360, 720), (420, 790)], fill=(4, 44, 56, 214))
    draw.polygon([(0, 920), (800, 640), (1520, 1010), (1520, 1330), (360, 1420)], fill=(8, 30, 38, 224))
    draw.polygon([(220, 1250), (1220, 930), (1420, 1840), (480, 1970)], fill=(6, 54, 62, 182))
    draw.rectangle((1040, 0, 1114, HEIGHT), fill=(56, 232, 255, 115))
    draw.rectangle((1114, 0, 1140, HEIGHT), fill=(223, 255, 0, 214))
    draw.rectangle((1140, 0, 1168, HEIGHT), fill=(4, 16, 22, 230))
    image = Image.alpha_composite(image, planes)

    orbit = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(orbit)
    bounds = (-180, 190, 1180, 1550)
    draw.arc(bounds, 198, 526, fill=(223, 255, 0, 255), width=16)
    draw.arc((330, 420, 1570, 1660), 35, 312, fill=(56, 232, 255, 205), width=7)
    draw.arc((470, 580, 1370, 1480), 70, 330, fill=(241, 240, 233, 120), width=3)
    for offset in (0, 42, 84):
        draw.line((82, 1510 + offset, 870, 1280 + offset), fill=(223, 255, 0, 112), width=5)
    image = Image.alpha_composite(image, orbit)

    glitch = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glitch)
    for _ in range(64):
        y = int(rng.integers(120, HEIGHT - 80))
        x = int(rng.integers(20, WIDTH - 360))
        width = int(rng.integers(80, 520))
        height = int(rng.integers(3, 18))
        color = (56, 232, 255, int(rng.integers(35, 120))) if rng.random() > 0.35 else (223, 255, 0, int(rng.integers(40, 135)))
        draw.rectangle((x, y, min(WIDTH, x + width), y + height), fill=color)
    image = Image.alpha_composite(image, glitch.filter(ImageFilter.GaussianBlur(0.35)))

    scan = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(scan)
    for y in range(0, HEIGHT, 6):
        draw.line((0, y, WIDTH, y), fill=(241, 240, 233, 10), width=1)
    image = Image.alpha_composite(image, scan)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(OUT, format="WEBP", quality=88, method=6)
    print(OUT)


if __name__ == "__main__":
    main()
