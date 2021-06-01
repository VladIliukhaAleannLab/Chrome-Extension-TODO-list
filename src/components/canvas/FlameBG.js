import React from "react";
import { useEffect } from "react";

export default () => {

    useEffect( () => {
        const canvas = document.getElementById('FlameBackground');
        canvas.style.position = 'absolute';
        canvas.style.cursor = 'default';
        canvas.style.zIndex = '-100';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.background = 'linear-gradient( 32deg, #3c170c 0%, #111 100% )';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

        const OPTIONS = {
            AMOUNT: 75,
            UPPER_LIMIT: 4,
            LOWER_LIMIT: 1,
        };

        const UPPER_SIZE = 4;
        const LOWER_SIZE = 1;

        const doIt = () => Math.random() > 0.5;
        const update = p =>
            doIt()
                ? Math.max(OPTIONS.LOWER_LIMIT, p - 1)
                : Math.min(p + 1, OPTIONS.UPPER_LIMIT);
        const reset = p => {
            p.x = p.startX;
            p.y = p.startY
        };
        const floored = r => Math.floor(Math.random() * r);
        const genParticles = () =>
            new Array(OPTIONS.AMOUNT).fill().map(p => {
                const size = floored(UPPER_SIZE) + LOWER_SIZE;
                const c = document.createElement('canvas');
                const ctx = c.getContext('2d');
                const r = (Math.PI / 180) * floored(360);
                const color = `rgba(255,${100 +
                Math.floor(Math.random() * 70)}, 0, ${Math.random()})`;
                const xDelayed = doIt();
                const startX = xDelayed
                    ? -(size + floored(canvas.width))
                    : floored(canvas.width * 0.25);
                const startY = xDelayed
                    ? size + floored(canvas.height * 0.25) + Math.floor(canvas.height * 0.75)
                    : canvas.height + size + floored(canvas.height);
                c.height = size;
                c.width = size;
                context.globalCompositeOperation = 'multiply';
                // ctx.filter = `blur(${Math.random() * size}px)`
                ctx.translate(size / 2, size / 2);
                ctx.rotate(r);
                ctx.translate(-(size / 2), -(size / 2));
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, size, size);
                return {
                    x: startX,
                    y: startY,
                    startY,
                    startX,
                    c,
                    r,
                    vx: floored(OPTIONS.UPPER_LIMIT / 4),
                    vy: floored(OPTIONS.UPPER_LIMIT / 4),
                    size,
                }
            });

        let particles = genParticles();
        let FRAME_COUNT = 0;

        const draw = () => {
            if (
                canvas.width !== window.innerWidth ||
                canvas.height !== window.innerHeight
            ) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                particles = genParticles()
            }
            // context.restore()
            for (const particle of particles) {
                context.clearRect(particle.x, particle.y, particle.size, particle.size);
                FRAME_COUNT++;
                if (particle.y < canvas.height || particle.startX < 0)
                    particle.x += particle.vx;
                if (particle.x > 0 || particle.startY > canvas.height)
                    particle.y -= particle.vy;
                if (FRAME_COUNT % 11 === 0 && doIt()) particle.vx = update(particle.vx);
                if (FRAME_COUNT % 13 === 0 && doIt()) particle.vy = update(particle.vy);
                context.drawImage(particle.c, particle.x, particle.y);
                if (particle.x > canvas.width || particle.y < -particle.size)
                    reset(particle)
            }
            requestAnimationFrame(draw)
        };
        requestAnimationFrame(draw);
    }, []);

    return (
        <canvas id="FlameBackground"/>
    )
};
