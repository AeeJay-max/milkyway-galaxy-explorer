import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const TEXTURES = {
    mercury: 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
    venus: 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg',
    earth: 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
    mars: 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
    jupiter: 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
    saturn: 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
    uranus: 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
    neptune: 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
};

const DEST_DIR = path.join(process.cwd(), 'public', 'textures');
if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });

async function download(name, url) {
    const destPath = path.join(DEST_DIR, `${name}.jpg`);
    return new Promise((resolve) => {
        const options = {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/114.0.0.0' }
        };
        https.get(url, options, (res) => {
            // Handling redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return https.get(res.headers.location, options, (redirectRes) => {
                    const file = fs.createWriteStream(destPath);
                    redirectRes.pipe(file);
                    file.on('finish', () => resolve());
                });
            }
            if (res.statusCode !== 200) {
                // Fallback to a solid 1x1 encoded PNG to prevent WebGL crash on 0 byte files!
                const fallback = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
                fs.writeFileSync(destPath, fallback);
                console.log(`Failed ${name}, using fallback.`);
                return resolve();
            }
            const file = fs.createWriteStream(destPath);
            res.pipe(file);
            file.on('finish', () => {
                console.log(`Downloaded ${name}`);
                resolve();
            });
        }).on('error', () => resolve());
    });
}

async function run() {
    await Promise.all(Object.entries(TEXTURES).map(([n, u]) => download(n, u)));
    console.log('All textures processed safely.');
}

run();
