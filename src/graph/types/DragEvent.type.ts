export type DragEventD3 = {
    active: number;
    subject: {
        fx: number | null;
        fy: number | null;
        x: number;
        y: number;
    };
    x: number;
    y: number;
};
