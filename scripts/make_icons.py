#!/usr/bin/env python3
"""Generate the app icons (SVG + PNG) without third-party libraries.

Motif: "( • )", a word inside brackets, built from primitives. Deliberately neutral; it is not the
Toki Pona logo. PNGs are rasterised with 4x4 supersampling and written with a minimal PNG encoder.

Usage: python3 scripts/make_icons.py
"""
import math
import os
import struct
import zlib

ICONS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "icons")

BG = (0x1F, 0x5C, 0x66)
FG = (0xF6, 0xF4, 0xEE)
DOT = (0xE3, 0xA7, 0x2F)

R = 0.32           # bracket radius (unit square)
T = 0.075          # stroke width
SPAN = math.radians(55)
LEFT_C = (0.62, 0.5)
RIGHT_C = (0.38, 0.5)
DOT_R = 0.075
CORNER = 0.22


def arc_distance(x, y, center, mid_angle):
    """Distance from (x, y) to an arc of radius R around center, spanning mid_angle +- SPAN (y up)."""
    cx, cy = center
    dx, dy = x - cx, cy - y
    ang = math.atan2(dy, dx)
    diff = (ang - mid_angle + math.pi) % (2 * math.pi) - math.pi
    if abs(diff) <= SPAN:
        return abs(math.hypot(dx, dy) - R)
    best = float("inf")
    for a in (mid_angle - SPAN, mid_angle + SPAN):
        ex, ey = cx + R * math.cos(a), cy - R * math.sin(a)
        best = min(best, math.hypot(x - ex, y - ey))
    return best


def inside_rounded_square(x, y, radius):
    if radius <= 0:
        return 0 <= x <= 1 and 0 <= y <= 1
    qx = min(x, 1 - x)
    qy = min(y, 1 - y)
    if qx < 0 or qy < 0:
        return False
    if qx >= radius or qy >= radius:
        return True
    return math.hypot(radius - qx, radius - qy) <= radius


def sample(x, y, corner):
    """RGBA of one sample point."""
    if not inside_rounded_square(x, y, corner):
        return (0, 0, 0, 0)
    if math.hypot(x - 0.5, y - 0.5) <= DOT_R:
        return (*DOT, 255)
    if arc_distance(x, y, LEFT_C, math.pi) <= T / 2 or arc_distance(x, y, RIGHT_C, 0.0) <= T / 2:
        return (*FG, 255)
    return (*BG, 255)


def render(size, corner, ss=4):
    rows = []
    for py in range(size):
        row = bytearray([0])  # filter type 0
        for px in range(size):
            acc = [0, 0, 0, 0]
            for sy in range(ss):
                for sx in range(ss):
                    r, g, b, a = sample((px + (sx + 0.5) / ss) / size, (py + (sy + 0.5) / ss) / size, corner)
                    acc[0] += r * a
                    acc[1] += g * a
                    acc[2] += b * a
                    acc[3] += a
            alpha = acc[3]
            if alpha:
                row += bytes((round(acc[0] / alpha), round(acc[1] / alpha), round(acc[2] / alpha),
                              round(alpha / (ss * ss))))
            else:
                row += b"\0\0\0\0"
        rows.append(bytes(row))
    return b"".join(rows)


def png(size, raw):
    def chunk(kind, data):
        body = kind + data
        return struct.pack(">I", len(data)) + body + struct.pack(">I", zlib.crc32(body) & 0xFFFFFFFF)
    header = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)  # 8-bit RGBA
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", header) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")


def svg():
    def pt(center, angle):
        return center[0] * 100 + R * 100 * math.cos(angle), center[1] * 100 - R * 100 * math.sin(angle)
    lt, lb = pt(LEFT_C, math.pi - SPAN), pt(LEFT_C, math.pi + SPAN)
    rt, rb = pt(RIGHT_C, SPAN), pt(RIGHT_C, -SPAN)
    r, w = R * 100, T * 100
    hexc = lambda c: "#%02x%02x%02x" % c  # noqa: E731
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
            f'<rect width="100" height="100" rx="{CORNER * 100:g}" fill="{hexc(BG)}"/>'
            f'<g fill="none" stroke="{hexc(FG)}" stroke-width="{w:g}" stroke-linecap="round">'
            f'<path d="M{lt[0]:.2f} {lt[1]:.2f}A{r:g} {r:g} 0 0 0 {lb[0]:.2f} {lb[1]:.2f}"/>'
            f'<path d="M{rt[0]:.2f} {rt[1]:.2f}A{r:g} {r:g} 0 0 1 {rb[0]:.2f} {rb[1]:.2f}"/></g>'
            f'<circle cx="50" cy="50" r="{DOT_R * 100:g}" fill="{hexc(DOT)}"/></svg>\n')


def main():
    os.makedirs(ICONS, exist_ok=True)
    with open(os.path.join(ICONS, "icon.svg"), "w", encoding="utf-8") as fh:
        fh.write(svg())
    # (file, size, corner radius): maskable and Apple icons are full-bleed squares
    for name, size, corner in (("icon-192.png", 192, CORNER), ("icon-512.png", 512, CORNER),
                               ("maskable-512.png", 512, 0), ("apple-touch-icon.png", 180, 0)):
        with open(os.path.join(ICONS, name), "wb") as fh:
            fh.write(png(size, render(size, corner)))
        print("written:", name)


if __name__ == "__main__":
    main()
