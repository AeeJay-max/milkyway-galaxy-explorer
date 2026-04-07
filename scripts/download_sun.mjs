import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const url = 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg';
const destPath = path.join(process.cwd(), 'public', 'textures', 'sun.jpg');

const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };

https.get(url, options, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, options, (redirectRes) => {
            const file = fs.createWriteStream(destPath);
            redirectRes.pipe(file);
            file.on('finish', () => console.log('Sun texture downloaded!'));
        });
        return;
    }
    const file = fs.createWriteStream(destPath);
    res.pipe(file);
    file.on('finish', () => console.log('Sun texture downloaded!'));
});
