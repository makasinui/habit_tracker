export const useCanvas = () => {
    const canvas = ref<HTMLCanvasElement>();

    const drawCircle = (
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number,
        style: string
    ) => {
        if(!canvas.value) {
            return;
        }
        const context = canvas.value.getContext('2d')

        if(!context) {
            return;
        }

        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle);
        context.strokeStyle = style;
        context.lineWidth = 15;
        context.stroke();
    };

    const drawCircleProgress = (progress = 0, radius = 50, fillCompleted = '#fff', fillUncompleted = '#FFC6A6') => {
        if (!canvas.value) {
            return;
        }

        const canvasVal = canvas.value;
        const ctx = canvasVal.getContext('2d');

        const centerX = canvasVal.width / 2;
        const centerY = canvasVal.height / 2;

        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, canvasVal.width, canvasVal.height);

        drawCircle(centerX, centerY, radius, Math.PI, Math.PI * Math.PI, fillUncompleted);
        drawCircle(centerX, centerY, radius, -0.5 * Math.PI, progress * 2 * Math.PI - 0.5 * Math.PI, fillCompleted)

        ctx.font = '21px Nunito';
        ctx.fillStyle = '#fff';

        const progressPercent = progress ? (progress * 100).toFixed() : 0;
        const x = String(progressPercent).length >= 2 ? 55 : 60;
        ctx.fillText(progressPercent + '%', x, 80);
    };

    return {
        canvas,
        drawCircle,
        drawCircleProgress,
    };
};
