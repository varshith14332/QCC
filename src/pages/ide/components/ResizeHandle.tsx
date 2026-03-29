import { useState, useRef, useEffect } from 'react';

interface ResizeHandleProps {
  direction: 'col' | 'row';
  target?: string;
  onResize: (delta: number) => void;
}

export const ResizeHandle = ({ direction, onResize }: ResizeHandleProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const currentPos = direction === 'col' ? e.clientX : e.clientY;
      const delta = currentPos - startPos.current;
      startPos.current = currentPos;
      onResize(delta);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, direction, onResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = direction === 'col' ? e.clientX : e.clientY;
    document.body.style.cursor = direction === 'col' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`flex-shrink-0 transition-colors duration-150 ${
        direction === 'col'
          ? 'w-1 h-full cursor-col-resize hover:bg-accent'
          : 'h-1 w-full cursor-row-resize hover:bg-accent'
      } ${isDragging ? 'bg-accent' : 'bg-transparent'}`}
    />
  );
};
