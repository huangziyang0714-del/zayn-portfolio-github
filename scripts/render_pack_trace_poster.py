from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WIDTH, HEIGHT = 1200, 900
ACID = (200, 255, 26)
PAPER = (239, 240, 233)


def font(path, size):
    return ImageFont.truetype(path, size)


def main():
    fonts = Path(r"C:\Windows\Fonts")
    impact = str(fonts / "impact.ttf")
    arial = str(fonts / "arial.ttf")
    arial_bold = str(fonts / "arialbd.ttf")

    image = Image.new("RGB", (WIDTH, HEIGHT), (12, 16, 12))
    draw = ImageDraw.Draw(image)

    # Dark green technical gradient with a restrained lime glow in the upper right.
    for y in range(HEIGHT):
        t = y / (HEIGHT - 1)
        left = (17 + int(3 * t), 20 + int(9 * t), 15 + int(2 * t))
        right = (38 - int(24 * t), 48 - int(35 * t), 29 - int(20 * t))
        for x in range(WIDTH):
            ratio = x / (WIDTH - 1)
            image.putpixel((x, y), tuple(int(left[i] * (1 - ratio) + right[i] * ratio) for i in range(3)))

    draw = ImageDraw.Draw(image, "RGBA")
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow, "RGBA")
    for radius in range(400, 0, -10):
        alpha = int(18 * (1 - radius / 400))
        glow_draw.ellipse((900 - radius, 250 - radius, 900 + radius, 250 + radius), fill=(*ACID, alpha))
    image = Image.alpha_composite(image.convert("RGBA"), glow)
    draw = ImageDraw.Draw(image, "RGBA")

    draw.line((70, 130, 1130, 130), fill=(*PAPER, 44), width=1)
    draw.line((70, 780, 1130, 780), fill=(*PAPER, 44), width=1)

    draw.text((70, 46), "TUOJI SYSTEM / 01", font=font(arial_bold, 18), fill=(*PAPER, 170), spacing=4)
    top_right = "FIELD EQUIPMENT / 2026"
    right_width = draw.textbbox((0, 0), top_right, font=font(arial, 16))[2]
    draw.text((1130 - right_width, 52), top_right, font=font(arial, 16), fill=(*PAPER, 200))

    # One centered mark, followed by its English lockup.
    draw.rectangle((480, 245, 720, 485), fill=(21, 23, 19, 255))
    mark = [(528, 437), (528, 397), (585, 325), (670, 325), (670, 365), (613, 365), (613, 437), (679, 437)]
    draw.line(mark, fill=ACID, width=18, joint="curve")

    lockup = "PACK TRACE"
    lockup_font = font(impact, 104)
    lockup_width = draw.textbbox((0, 0), lockup, font=lockup_font)[2]
    draw.text(((WIDTH - lockup_width) // 2, 565), lockup, font=lockup_font, fill=ACID)
    subline = "BRAND SYSTEM / TUOJI"
    subline_font = font(arial_bold, 15)
    subline_width = draw.textbbox((0, 0), subline, font=subline_font)[2]
    draw.text(((WIDTH - subline_width) // 2, 690), subline, font=subline_font, fill=PAPER)

    draw.text((70, 815), "TECHNICAL OUTDOOR PET SYSTEM", font=font(arial_bold, 18), fill=PAPER, spacing=3)
    footer = "01 / 08"
    footer_width = draw.textbbox((0, 0), footer, font=font(arial_bold, 18))[2]
    draw.text((1130 - footer_width, 815), footer, font=font(arial_bold, 18), fill=ACID)

    output = Path(__file__).resolve().parents[1] / "public" / "assets" / "pack-trace-poster.png"
    image.convert("RGB").save(output, "PNG", optimize=True)
    print(output)


if __name__ == "__main__":
    main()
