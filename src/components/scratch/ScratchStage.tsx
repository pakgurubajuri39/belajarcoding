import React, { useRef, useEffect, useState } from 'react';
import { SpriteState } from './scratchTypes';

interface ScratchStageProps {
  sprites: SpriteState[];
  selectedSpriteId: string;
  onSelectSprite: (id: string) => void;
  onUpdateSpritePos: (id: string, x: number, y: number) => void;
  selectedBackdrop: string;
  stageVariables: { skor: number; nyawa: number; timer: number };
  penTrailsRef: React.MutableRefObject<{ x1: number; y1: number; x2: number; y2: number; color: string }[]>;
  isCompact?: boolean;
}

export const ScratchStage: React.FC<ScratchStageProps> = ({
  sprites,
  selectedSpriteId,
  onSelectSprite,
  onUpdateSpritePos,
  selectedBackdrop,
  stageVariables,
  penTrailsRef,
  isCompact = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDraggingSprite, setIsDraggingSprite] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle Stage Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Backdrop
    if (selectedBackdrop === 'grid') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Coordinate Grid Lines
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Origin Axes
      ctx.strokeStyle = '#4C97FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#4C97FF';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('Y (180)', width / 2 + 5, 14);
      ctx.fillText('Y (-180)', width / 2 + 5, height - 6);
      ctx.fillText('X (-240)', 6, height / 2 - 6);
      ctx.fillText('X (240)', width - 46, height / 2 - 6);
      ctx.fillText('(0,0)', width / 2 + 6, height / 2 + 14);
    } else if (selectedBackdrop === 'space') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#030712');
      grad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 45; i++) {
        const sx = (i * 83 + 23) % width;
        const sy = (i * 97 + 37) % height;
        const r = (i % 3) * 0.8 + 0.8;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (selectedBackdrop === 'city') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#312e81');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#1e1b4b';
      for (let i = 0; i < 8; i++) {
        const bx = i * 62;
        const bw = 54;
        const bh = 110 + (i % 3) * 45;
        ctx.fillRect(bx, height - bh, bw, bh);
        ctx.strokeStyle = '#6366f1';
        ctx.strokeRect(bx, height - bh, bw, bh);

        ctx.fillStyle = '#facc15';
        for (let wy = height - bh + 15; wy < height - 15; wy += 22) {
          ctx.fillRect(bx + 12, wy, 8, 8);
          ctx.fillRect(bx + 32, wy, 8, 8);
        }
        ctx.fillStyle = '#1e1b4b';
      }
    } else if (selectedBackdrop === 'nature') {
      ctx.fillStyle = '#7dd3fc';
      ctx.fillRect(0, 0, width, height * 0.65);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, height * 0.65, width, height * 0.35);

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(410, 60, 32, 0, Math.PI * 2);
      ctx.fill();
    } else if (selectedBackdrop === 'underwater') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(1, '#082f49');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#eab308';
      ctx.fillRect(0, height * 0.85, width, height * 0.15);
    } else if (selectedBackdrop === 'stage') {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, height * 0.7, width, height * 0.3);

      ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width * 0.85, height);
      ctx.lineTo(width * 0.15, height);
      ctx.closePath();
      ctx.fill();
    }

    // 2. Draw Pen Trails
    penTrailsRef.current.forEach(t => {
      ctx.strokeStyle = t.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      const sx1 = width / 2 + t.x1;
      const sy1 = height / 2 - t.y1;
      const sx2 = width / 2 + t.x2;
      const sy2 = height / 2 - t.y2;
      ctx.moveTo(sx1, sy1);
      ctx.lineTo(sx2, sy2);
      ctx.stroke();
    });

    // 3. Draw Sprites
    sprites.forEach(sprite => {
      if (!sprite.visible) return;

      const screenX = width / 2 + sprite.x;
      const screenY = height / 2 - sprite.y;
      const scale = (sprite.size / 100) * 0.85;

      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(((sprite.direction - 90) * Math.PI) / 180);
      ctx.scale(scale, scale);

      ctx.filter = `hue-rotate(${sprite.colorHue}deg)`;

      if (sprite.type === 'cat') {
        // Tail
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-20, 18);
        ctx.quadraticCurveTo(-38, 5, -34, -18);
        ctx.stroke();

        // Body
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.ellipse(0, 12, 26, 32, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Belly
        ctx.fillStyle = '#FEF3C7';
        ctx.beginPath();
        ctx.ellipse(0, 16, 14, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(0, -18, 23, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Ears
        ctx.beginPath();
        ctx.moveTo(-16, -34); ctx.lineTo(-8, -48); ctx.lineTo(-2, -37);
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(16, -34); ctx.lineTo(8, -48); ctx.lineTo(2, -37);
        ctx.fill(); ctx.stroke();

        // Eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-8, -21, 6, 9, 0, 0, Math.PI * 2);
        ctx.ellipse(8, -21, 6, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Pupils
        ctx.fillStyle = '#0F172A';
        ctx.beginPath();
        ctx.arc(-7, -21, 3.5, 0, Math.PI * 2);
        ctx.arc(9, -21, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = '#F43F5E';
        ctx.beginPath();
        ctx.arc(0, -12, 3, 0, Math.PI * 2);
        ctx.fill();

        // Whiskers
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-10, -11); ctx.lineTo(-24, -14);
        ctx.moveTo(-10, -8); ctx.lineTo(-23, -6);
        ctx.moveTo(10, -11); ctx.lineTo(24, -14);
        ctx.moveTo(10, -8); ctx.lineTo(23, -6);
        ctx.stroke();
      } else if (sprite.type === 'robot') {
        ctx.fillStyle = '#06B6D4';
        ctx.fillRect(-22, -28, 44, 52);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(-22, -28, 44, 52);

        ctx.fillStyle = '#FACC15';
        ctx.fillRect(-14, -20, 10, 10);
        ctx.fillRect(4, -20, 10, 10);

        ctx.strokeStyle = '#FACC15';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -28); ctx.lineTo(0, -44);
        ctx.stroke();
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(0, -44, 5, 0, Math.PI * 2);
        ctx.fill();
      } else if (sprite.type === 'rocket') {
        ctx.fillStyle = '#F43F5E';
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(22, 18);
        ctx.lineTo(-22, 18);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(0, -6, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.moveTo(-12, 18);
        ctx.lineTo(0, 36);
        ctx.lineTo(12, 18);
        ctx.fill();
      }

      ctx.restore();

      // 4. Speech or Thought Balloon
      if (sprite.sayText) {
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 2;

        const bw = Math.min(220, Math.max(120, sprite.sayText.length * 9 + 24));
        const bh = 34;
        const bx = Math.min(Math.max(screenX - bw / 2, 10), width - bw - 10);
        const by = Math.max(screenY - 80, 10);

        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 10);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        if (sprite.sayType === 'think') {
          ctx.arc(screenX, by + bh + 6, 4, 0, Math.PI * 2);
          ctx.arc(screenX, by + bh + 14, 2.5, 0, Math.PI * 2);
        } else {
          ctx.moveTo(screenX - 6, by + bh);
          ctx.lineTo(screenX, by + bh + 10);
          ctx.lineTo(screenX + 6, by + bh);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(sprite.sayText, bx + bw / 2, by + 21);
        ctx.restore();
      }
    });
  }, [sprites, selectedBackdrop, selectedSpriteId]);

  // Stage Mouse Interactivity (Drag Sprite on Stage)
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;

    // Convert to Scratch coordinates
    const scratchX = Math.round(clickX - canvas.width / 2);
    const scratchY = Math.round(canvas.height / 2 - clickY);

    // Find clicked sprite
    const clickedSprite = [...sprites].reverse().find(s => {
      const dist = Math.sqrt(Math.pow(s.x - scratchX, 2) + Math.pow(s.y - scratchY, 2));
      return dist < 45;
    });

    if (clickedSprite) {
      onSelectSprite(clickedSprite.id);
      setIsDraggingSprite(true);
      setDragOffset({ x: scratchX - clickedSprite.x, y: scratchY - clickedSprite.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingSprite) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const curX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const curY = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const targetX = Math.min(240, Math.max(-240, Math.round(curX - canvas.width / 2 - dragOffset.x)));
    const targetY = Math.min(180, Math.max(-180, Math.round(canvas.height / 2 - curY - dragOffset.y)));

    onUpdateSpritePos(selectedSpriteId, targetX, targetY);
  };

  const handleMouseUp = () => {
    setIsDraggingSprite(false);
  };

  return (
    <div className={`relative w-full aspect-[4/3] mx-auto bg-white rounded-lg overflow-hidden border border-slate-300 shadow-inner flex items-center justify-center select-none ${
      isCompact ? 'max-w-[340px]' : 'max-w-[480px]'
    }`}>
      
      {/* 480x360 Native Scratch Stage Canvas */}
      <canvas
        ref={canvasRef}
        width={480}
        height={360}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-pointer object-contain"
        title="Klik dan seret sprite langsung di panggung"
      />

      {/* Top Left Scratch Variable Monitors */}
      <div className={`absolute top-1.5 left-1.5 flex flex-col gap-1 z-10 pointer-events-none ${
        isCompact ? 'scale-90 origin-top-left' : ''
      }`}>
        {/* Skor Variable */}
        <div className="bg-[#E9F1FC] border border-[#B8D5FA] rounded-md px-1.5 py-0.5 shadow-sm flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold">
          <span className="text-[#FF8C1A]">skor</span>
          <span className="bg-[#FF8C1A] text-white px-1.5 py-0.2 rounded text-[10px] sm:text-[11px] font-black">
            {stageVariables.skor}
          </span>
        </div>

        {/* Nyawa Variable */}
        <div className="bg-[#E9F1FC] border border-[#B8D5FA] rounded-md px-1.5 py-0.5 shadow-sm flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold">
          <span className="text-[#FF8C1A]">nyawa</span>
          <span className="bg-[#FF8C1A] text-white px-1.5 py-0.2 rounded text-[10px] sm:text-[11px] font-black">
            {stageVariables.nyawa}
          </span>
        </div>

        {/* Timer Variable */}
        <div className="bg-[#E9F1FC] border border-[#B8D5FA] rounded-md px-1.5 py-0.5 shadow-sm flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold">
          <span className="text-[#5CB1D6]">timer</span>
          <span className="bg-[#5CB1D6] text-white px-1.5 py-0.2 rounded text-[10px] sm:text-[11px] font-black">
            {stageVariables.timer.toFixed(1)}
          </span>
        </div>
      </div>

    </div>
  );
};
