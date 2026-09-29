"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight animated double helix on a 2D canvas.
 * No Three.js. Depth-sorted nodes, glowing rungs, slow rotation, mouse parallax.
 */
export default function HelixCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let t = 0;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      tmx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      tmy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const io = new IntersectionObserver(
      (entries) => {
        running = entries.some((e) => e.isIntersecting);
        if (running && !raf) raf = requestAnimationFrame(frame);
      },
      { threshold: 0.01 },
    );

    const NODES = 46; // per strand
    const TURNS = 2.2;

    const frame = () => {
      raf = 0;
      if (!running) return;
      t += reduced ? 0 : 0.006;
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5 + mx * 14;
      const cy = h * 0.5 + my * 10;
      const radius = Math.min(w, h) * 0.22;
      const height = h * 0.92;
      const tiltX = 0.18 + my * 0.08;
      const tiltZ = mx * 0.12;

      type Node = { x: number; y: number; z: number; strand: number; i: number };
      const nodes: Node[] = [];
      for (let s = 0; s < 2; s++) {
        for (let i = 0; i < NODES; i++) {
          const p = i / (NODES - 1);
          const ang = p * Math.PI * 2 * TURNS + t + s * Math.PI;
          let x = Math.cos(ang) * radius;
          let z = Math.sin(ang) * radius;
          let y = (p - 0.5) * height;
          // tilt around X
          const y1 = y * Math.cos(tiltX) - z * Math.sin(tiltX);
          const z1 = y * Math.sin(tiltX) + z * Math.cos(tiltX);
          y = y1;
          z = z1;
          // tilt around Z
          const x2 = x * Math.cos(tiltZ) - y * Math.sin(tiltZ);
          const y2 = x * Math.sin(tiltZ) + y * Math.cos(tiltZ);
          x = x2;
          y = y2;
          nodes.push({ x: cx + x, y: cy + y, z, strand: s, i });
        }
      }

      // rungs first (behind)
      ctx.lineCap = "round";
      for (let i = 0; i < NODES; i += 2) {
        const a = nodes[i];
        const b = nodes[NODES + i];
        const depth = (a.z + b.z) / (2 * radius); // -1..1
        const alpha = 0.12 + (depth + 1) * 0.16;
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(127,216,240,${alpha})`);
        grad.addColorStop(1, `rgba(185,174,245,${alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1 + (depth + 1) * 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // strands as smooth paths
      for (let s = 0; s < 2; s++) {
        const pts = nodes.filter((n) => n.strand === s);
        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = s === 0 ? "rgba(127,216,240,0.35)" : "rgba(185,174,245,0.35)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // nodes sorted by depth
      const sorted = [...nodes].sort((a, b) => a.z - b.z);
      for (const n of sorted) {
        const depth = (n.z / radius + 1) / 2; // 0..1
        const r = 1.6 + depth * 3.4;
        const a = 0.25 + depth * 0.75;
        const color = n.strand === 0 ? `rgba(127,216,240,${a})` : `rgba(185,174,245,${a})`;
        ctx.shadowBlur = 10 + depth * 18;
        ctx.shadowColor = n.strand === 0 ? "rgba(127,216,240,0.9)" : "rgba(139,124,240,0.9)";
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={`helix-canvas ${className}`} aria-hidden="true" />;
}
