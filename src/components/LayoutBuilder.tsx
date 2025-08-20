/*
================================================================================
components/LayoutBuilder.tsx
================================================================================*/

"use client";
import { useState, useRef } from "react";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { nanoid } from "nanoid";

// ------------------------------ constants ------------------------------------
const GRID = 30; // px per grid cell
const PALETTE_W = 160;
const CANVAS_W = 900;
const CANVAS_H = 600;

// ------------------------------ types ----------------------------------------
interface UnitType {
    id: string;
    label: string;
    w: number; // width  in grid cells
    h: number; // height in grid cells
    color: string;
}
interface UnitInstance {
    id: string;
    typeId: string;
    x: number;
    y: number;
}

// demo catalog – extend or fetch from DB later
const UNIT_TYPES: UnitType[] = [
    { id: "S", label: "5×5", w: 2, h: 2, color: "#6ee7b7" },
    { id: "M", label: "10×10", w: 4, h: 4, color: "#93c5fd" },
    { id: "L", label: "10×15", w: 4, h: 6, color: "#fcd34d" },
];
const TEMPLATE_POS = UNIT_TYPES.map((_, i) => ({ x: 20, y: 30 + i * 100 }));
const snap = (v: number) => Math.round(v / GRID) * GRID;

export default function LayoutBuilder() {
    const [units, setUnits] = useState<UnitInstance[]>([]);
    const stageRef = useRef<Konva.Stage | null>(null);

    // ----- palette drag‑n‑clone -------------------------------------------------
    const handlePaletteDragEnd = (
        idx: number,
        e: KonvaEventObject<DragEvent>
    ) => {
        const { x, y } = e.target.position();
        if (x > PALETTE_W) {
            const type = UNIT_TYPES[idx];
            setUnits((prev) => [
                ...prev,
                { id: nanoid(6), typeId: type.id, x: snap(x), y: snap(y) },
            ]);
        }
        e.target.position(TEMPLATE_POS[idx]); // reset template location
        stageRef.current?.batchDraw();
    };

    // ----- move placed units ----------------------------------------------------
    const handleUnitDragEnd = (
        id: string,
        e: KonvaEventObject<DragEvent>
    ) => {
        const { x, y } = e.target.position();
        setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, x: snap(x), y: snap(y) } : u)));
    };

    // ----- render ---------------------------------------------------------------
    return (
        <div style={{ display: "flex", height: CANVAS_H }}>
            <Stage
                ref={stageRef}
                width={CANVAS_W}
                height={CANVAS_H}
                style={{ border: "1px solid #e5e7eb" }}
            >
                {/* grid */}
                <Layer listening={false}>
                    {Array.from({ length: CANVAS_W / GRID + 1 }).map((_, i) => (
                        <Line
                            key={"v" + i}
                            points={[i * GRID, 0, i * GRID, CANVAS_H]}
                            stroke="#f3f4f6"
                        />
                    ))}
                    {Array.from({ length: CANVAS_H / GRID + 1 }).map((_, i) => (
                        <Line
                            key={"h" + i}
                            points={[0, i * GRID, CANVAS_W, i * GRID]}
                            stroke="#f3f4f6"
                        />
                    ))}
                </Layer>

                {/* palette */}
                <Layer>
                    <Rect
                        x={0}
                        y={0}
                        width={PALETTE_W}
                        height={CANVAS_H}
                        fill="#fafafa"
                        stroke="#e5e7eb"
                    />
                    {UNIT_TYPES.map((t, idx) => (
                        <>
                            <Rect
                                key={t.id}
                                draggable
                                x={TEMPLATE_POS[idx].x}
                                y={TEMPLATE_POS[idx].y}
                                width={t.w * GRID}
                                height={t.h * GRID}
                                fill={t.color}
                                opacity={0.8}
                                cornerRadius={4}
                                onDragEnd={(e) => handlePaletteDragEnd(idx, e)}
                            />
                            <Text
                                key={t.id + "lbl"}
                                x={TEMPLATE_POS[idx].x}
                                y={TEMPLATE_POS[idx].y + t.h * GRID + 4}
                                text={t.label}
                                fontSize={14}
                                fill="#111827"
                            />
                        </>
                    ))}
                </Layer>

                {/* placed units */}
                <Layer>
                    {units.map((u) => {
                        const type = UNIT_TYPES.find((t) => t.id === u.typeId)!;
                        return (
                            <Rect
                                key={u.id}
                                draggable
                                x={u.x}
                                y={u.y}
                                width={type.w * GRID}
                                height={type.h * GRID}
                                fill={type.color}
                                stroke="#374151"
                                strokeWidth={1}
                                cornerRadius={3}
                                onDragEnd={(e) => handleUnitDragEnd(u.id, e)}
                            />
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    );
}
