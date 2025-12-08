import Phaser from 'phaser';
import { gameConfig } from './game/config';
import { initRotateOrientation } from './rotateOrientation';

declare global {
    interface Window {
        lessonScene: any;
    }
}

const game = new Phaser.Game(gameConfig);

function updateUIButtonScale() {
    const container = document.getElementById('game-container')!;
    const resetBtn = document.getElementById('btn-reset') as HTMLImageElement;

    const w = container.clientWidth;
    const h = container.clientHeight;

    // base height = 720 (game design gốc)
    const scale = Math.min(w, h) / 720;

    const baseSize = 80; // kích thước nút thiết kế gốc (80px)
    const newSize = baseSize * scale;

    resetBtn.style.width = `${newSize}px`;
    resetBtn.style.height = 'auto';
}

export function showGameButtons() {
    const reset = document.getElementById('btn-reset');

    reset!.style.display = 'block';
}

export function hideGameButtons() {
    const reset = document.getElementById('btn-reset');

    reset!.style.display = 'none';
}

// Khởi tạo xoay màn hình
initRotateOrientation(game, {
    mainSceneKey: 'LessonSelectScene',
    overlaySceneKey: null,
});

// Scale nút
updateUIButtonScale();
window.addEventListener('resize', updateUIButtonScale);
window.addEventListener('orientationchange', updateUIButtonScale);

document.getElementById('btn-reset')?.addEventListener('click', () => {
    window.lessonScene?.restartLevel();
});
