export const useCanvas = () => {
    const canvas = ref<HTMLCanvasElement>();

    const drawCircleProgress = (progress = 0) => {
        if (!canvas.value) {
            return;
        }

        const canvasVal = canvas.value;
        const ctx = canvasVal.getContext('2d');

        const centerX = canvasVal.width / 2;
        const centerY = canvasVal.height / 2;

        const radius = 50;

        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, canvasVal.width, canvasVal.height);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, Math.PI, Math.PI * Math.PI);
        ctx.strokeStyle = '#FFC6A6';
        ctx.lineWidth = 15;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, progress * 2 * Math.PI - 0.5 * Math.PI);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 15;
        ctx.stroke();

        ctx.font = '21px Nunito';
        ctx.fillStyle = '#fff';

        const progressPercent = progress ? (progress * 100).toFixed() : 0;
        const x = String(progressPercent).length >= 2 ? 55 : 60;
        ctx.fillText(progressPercent + '%', x, 80);
    };

    return {
        canvas,
        drawCircleProgress,
    };
};
