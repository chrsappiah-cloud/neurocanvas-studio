

'use client';

import { useEffect, useRef, useState } from 'react';
import { createSupabaseBrowserClient } from '../lib/supabase-browser';

const palette = ['#6de7ff', '#7fffd4', '#ffffff', '#ffb86b', '#ff7ad9', '#8f7dff'];

export function PaintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isDrawing = useRef(false);

  const [color, setColor] = useState(palette[0]);
  const [brush, setBrush] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 460 * window.devicePixelRatio;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `460px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    ctx.fillRect(0, 0, rect.width, 460);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const startDraw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const point = getPoint(event);
    isDrawing.current = true;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const point = getPoint(event);
    ctx.strokeStyle = color;
    ctx.lineWidth = brush;
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const endDraw = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !wrapper) return;

    const width = wrapper.getBoundingClientRect().width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    ctx.fillRect(0, 0, width, 460);
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'neurocanvas-artwork.png';
    link.click();
  };

  return (
    <div className="paintWrap" ref={wrapperRef}>
      <div className="paintToolbar">
        <div className="swatches">
          {palette.map((swatch) => (
            <button
              key={swatch}
              className={`swatch ${color === swatch ? 'active' : ''}`}
              style={{ background: swatch }}
              onClick={() => setColor(swatch)}
              aria-label={`Choose color ${swatch}`}
              type="button"
            />
          ))}
        </div>

        <label className="rangeGroup">
          <span>Brush {brush}px</span>
          <input
            type="range"
            min="4"
            max="28"
            value={brush}
            onChange={(e) => setBrush(Number(e.target.value))}
          />
        </label>

        <div className="paintActions">
          <button type="button" className="ghostBtn" onClick={clearCanvas}>
            Clear
          </button>
          <button type="button" className="primaryBtn" onClick={exportImage}>
            Export PNG
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="realCanvas"
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
        aria-label="Painting canvas"
      />
    </div>
  );
}
