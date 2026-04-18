const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else if (dirFile.endsWith('.tsx') || dirFile.endsWith('.js')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
}

const files = walkSync('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // General Replacements
  // Left side panels the #EFEFEF
  if (file.includes('student') || file.includes('Onboarding')) {
      content = content.replace(/bg-\[#EFEFEF\]/g, 'bg-nile-blue text-white');
      content = content.replace(/bg-[#EFEFEF]/g, 'bg-nile-blue text-white');
      // The organic blobs
      content = content.replace(/bg-gray-300\/50/g, 'bg-nile-white/20 border-white');
      content = content.replace(/bg-gray-300\/40/g, 'bg-nile-white/20 border-white');
      content = content.replace(/bg-gray-300\/30/g, 'bg-nile-white/20 border-white');
      // Change text inside blue panels
      content = content.replace(/text-black uppercase tracking-\[0\.2em\]([^>]*)>([^<]*)<\/p>/g, 'text-nile-white uppercase tracking-[0.2em]$1>$2</p>');
      content = content.replace(/text-2xl font-black text-black/g, 'text-2xl font-black text-nile-white');
      
      // Update buttons from black to green/blue
      if (!file.includes('Staff')) {
          content = content.replace(/bg-black text-white/g, 'bg-nile-green text-nile-white');
      }
  }

  if (file.includes('Staff')) {
      content = content.replace(/bg-black text-white/g, 'bg-nile-green text-nile-white');
      content = content.replace(/bg-\[#EFEFEF\]/g, 'bg-nile-green text-white');
  }

  if (file.includes('employer')) {
      content = content.replace(/bg-black text-white/g, 'bg-nile-blue text-nile-white');
      content = content.replace(/bg-\[#EFEFEF\]/g, 'bg-nile-blue text-white');
      content = content.replace(/text-nile-blue/g, 'text-nile-green'); // Accent text
  }
  
  // Replace static gray boxes with nile white or nile blue borders
  content = content.replace(/bg-\[#EBEBEB\]/g, 'bg-nile-white border-nile-blue');
  content = content.replace(/bg-gray-50/g, 'bg-nile-white/50');
  content = content.replace(/bg-gray-100/g, 'bg-nile-white');
  content = content.replace(/bg-gray-200/g, 'bg-nile-green/20');
  content = content.replace(/text-gray-400/g, 'text-nile-blue/70');
  content = content.replace(/text-gray-500/g, 'text-nile-blue');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated colors in:', file);
  }
});
