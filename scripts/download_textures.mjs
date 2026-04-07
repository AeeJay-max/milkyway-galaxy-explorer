import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const TEXTURES = {
    mercury: 'https://raw.githubusercontent.com/joshuaellis/planets/master/public/textures/mercury.jpg',
    venus: 'https://raw.githubusercontent.com/joshuaellis/planets/master/public/textures/venus.jpg',
    earth: 'https://raw.githubusercontent.com/joshuaellis/planets/master/public/textures/earth.jpg',
    mars: 'https://raw.githubusercontent.com/joshuaellis/planets/master/public/textures/mars.jpg',
    jupiter: 'https://raw.githubusercontent.com/joshuaellis/planets/master/public/textures/jupiter.jpg',
    saturn: 'https://raw.githubusercontent.com/joshuaellis/planets/master/public/textures/saturn.jpg',
    uranus: 'https://raw.githubusercontent.com/joshuaellis/planets/master/public/textures/uranus.jpg',
    neptune: 'https://raw.githubusercontent.com/joshuaellis/planets/master/public/textures/neptune.jpg',
};

const DEST_DIR = path.join(process.cwd(), 'public', 'textures');

if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Ensure the download script is highly resilient to any missing URL and provides a blank texture if the fetch fails completely
async function downloadTexture(name, url) {
    const destPath = path.join(DEST_DIR, `${name}.jpg`);

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            // Handle redirects if raw.githubusercontent redirects
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return https.get(response.headers.location, (redirectResponse) => {
                    const file = fs.createWriteStream(destPath);
                    redirectResponse.pipe(file);
                    file.on('finish', () => file.close(resolve));
                }).on('error', reject);
            }

            if (response.statusCode !== 200) {
                // Create an empty fallback file to prevent 404 crashes during development!
                console.warn(`[WARNING] Failed to fetch ${name} (${response.statusCode}), creating fallback placeholder.`);
                fs.writeFileSync(destPath, '');
                resolve();
                return;
            }

            const file = fs.createWriteStream(destPath);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`[SUCCESS] Downloaded ${name}.jpg`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => { });
            console.warn(`[ERROR] Fetched failed for ${name}:`, err.message);
            fs.writeFileSync(destPath, ''); // Fallback
            resolve();
        });
    });
}

async function run() {
    console.log('Downloading textures locally...');
    const promises = Object.entries(TEXTURES).map(([name, url]) => downloadTexture(name, url));
    await Promise.all(promises);
    console.log('Finished downloading all textures to /public/textures/.');
}

run();
