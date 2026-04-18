const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

function processFiles() {
    walkDir('./src', (filePath) => {
        if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

        let content = fs.readFileSync(filePath, 'utf-8');
        let newContent = content
            // Employer / Student portals (replace purple with nile-blue)
            .replace(/purple-500/g, 'nile-blue')
            .replace(/purple-600/g, 'nile-blue')
            .replace(/purple-100/g, 'nile-blue/20')
            .replace(/purple-50/g, 'nile-blue/10')
            
            // Staff portal (replace green with nile-green)
            .replace(/green-500/g, 'nile-green')
            .replace(/green-600/g, 'nile-green')
            .replace(/green-400/g, 'nile-green')
            .replace(/green-100/g, 'nile-green/20')
            .replace(/green-50/g, 'nile-green/10')

            // Misc old standard greens/purples in text or borders
            .replace(/text-green-600/g, 'text-nile-green')
            .replace(/border-green-600/g, 'border-nile-green')
            .replace(/text-purple-600/g, 'text-nile-blue')
            .replace(/border-purple-600/g, 'border-nile-blue')
            
            // Specific shadow colors
            .replace(/rgba\(34,197,94,1\)/g, '#6CBB56') // Tailwind green-500 hex
            .replace(/#16a34a/g, '#6CBB56') // Tailwind green-600 hex
            .replace(/#22c55e/g, '#6CBB56') // Tailwind green-500 hex
            .replace(/#a855f7/g, '#1E499D'); // Tailwind purple-500 hex to nile-blue

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log('Updated:', filePath);
        }
    });
}

processFiles();
