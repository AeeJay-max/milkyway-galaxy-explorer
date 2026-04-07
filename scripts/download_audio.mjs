import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

// Stable generic cosmic sci-fi drone from Freesound
const url = 'https://cdn.freesound.org/previews/514/514210_10522778-lq.mp3';
const dirPath = path.join(process.cwd(), 'public', 'audio');
if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

const destPath = path.join(dirPath, 'space-ambient.mp3');

https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
            const file = fs.createWriteStream(destPath);
            redirectRes.pipe(file);
            file.on('finish', () => console.log('✅ Space ambient MP3 downloaded gracefully.'));
        });
        return;
    }
    const file = fs.createWriteStream(destPath);
    res.pipe(file);
    file.on('finish', () => console.log('✅ Space ambient MP3 downloaded gracefully.'));
});
