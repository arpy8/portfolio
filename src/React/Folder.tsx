"use client";

import React, { useState } from "react";
import ShinyText from "./ShinyText";

interface FolderProps {
  color?: string;
  size?: number;
  images?: string[];
  className?: string;
  icon?: string;
  label?: string;
  link?: string;
}

const Folder: React.FC<FolderProps> = ({
  color = "#09090b",
  size = 1,
  images = [],
  icon = "",
  label = "",
  link = "",
}) => {
  const maxItems = 3;
  const imageItems = images.slice(0, maxItems);
  while (imageItems.length < maxItems) {
    imageItems.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = "#18181b";
  const paper1 = "#27272a";
  const paper2 = "#3f3f46";
  const paper3 = "#52525b";

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
    setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
  };

  const handlePaperMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const handleClick = () => {
    if (link) {
      window.location.href = link;
    }
  };

  const folderStyle: React.CSSProperties = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = (index: number) => {
    if (index === 0) return "translate(-120%, -70%) rotate(-15deg)";
    if (index === 1) return "translate(10%, -70%) rotate(15deg)";
    if (index === 2) return "translate(-50%, -100%) rotate(5deg)";
    return "";
  };

  return (
    <div className="flex flex-col items-center gap-2" style={scaleStyle}>
      <div className="relative">
        {icon && (
          <div className="absolute -top-4 -right-4 z-40 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-lg">
            <img src={icon} alt="" className="w-5 h-5 object-contain" />
          </div>
        )}
        <div
          className={`group relative transition-all duration-200 ease-in cursor-pointer ${!open ? "hover:-translate-y-2" : ""
            }`}
          style={{
            ...folderStyle,
            transform: open ? "translateY(-8px)" : undefined,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <div
            className="relative w-[100px] h-[80px] rounded-md shadow-sm border border-zinc-400 bg-zinc-950 ring-1 ring-zinc-200/20"
            style={{ backgroundColor: folderBackColor }}
          >
            <span
              className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-t-md border-t border-l border-r border-zinc-400 ring-1 ring-zinc-200/20"
              style={{ backgroundColor: folderBackColor }}
            ></span>
            {imageItems.map((img, i) => {
              let sizeClasses = "";
              if (i === 0) sizeClasses = open ? "w-[90%] h-[80%]" : "w-[90%] h-[80%]";
              if (i === 1) sizeClasses = open ? "w-[90%] h-[80%]" : "w-[90%] h-[80%]";
              if (i === 2) sizeClasses = open ? "w-[90%] h-[80%]" : "w-[90%] h-[80%]";

              const transformStyle = open
                ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
                : undefined;

              return (
                <div
                  key={i}
                  onMouseMove={(e) => handlePaperMouseMove(e, i)}
                  onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                  className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out shadow-sm border border-zinc-400 rounded-md ring-1 ring-zinc-200/20 overflow-hidden
                    ${!open
                      ? "transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0"
                      : "hover:scale-110"
                    } ${sizeClasses}`}
                  style={{
                    ...(!open ? {} : { transform: transformStyle }),
                    backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                  }}
                >
                  {img && (
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              );
            })}
            <div
              className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out rounded-md border border-zinc-400 ring-1 ring-zinc-200/20 ${!open ? "group-hover:[transform:skew(15deg)_scaleY(0.6)]" : ""
                }`}
              style={{
                backgroundColor: color,
                ...(open && { transform: "skew(15deg) scaleY(0.6)" }),
              }}
            ></div>
            <div
              className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out rounded-md border border-zinc-400 ring-1 ring-zinc-200/20 ${!open ? "group-hover:[transform:skew(-15deg)_scaleY(0.6)]" : ""
                }`}
              style={{
                backgroundColor: color,
                ...(open && { transform: "skew(-15deg) scaleY(0.6)" }),
              }}
            ></div>
          </div>
        </div>
      </div>
      {label && (
        <span className="text-zinc-400 text-[10px] font-medium">
          <ShinyText
            text={label}
            disabled={false}
          />
        </span>
      )}
    </div>
  );
};

export default Folder;