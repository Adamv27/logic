function eventPosToCanvas(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (event.x - rect.left) * scaleX;
    const canvasY = (event.y - rect.top) * scaleY;

    return [canvasX, canvasY];
}

export { eventPosToCanvas };
