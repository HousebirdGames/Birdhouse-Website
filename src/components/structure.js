import { birdhouseStructure } from '../birdhouse-structure.js';
import { getRelativePath } from '../../Birdhouse/src/main.js';

export default async function Structure() {
    return `
    <h1 id="birdhouseStructure">Birdhouse Structure</h1>
    <div class="birdhouse-structure">
        ${generateHTMLForStructure(birdhouseStructure)}
    </div>
    `;
}

function pathToURL(path) {
    return path.replace(/\\/g, '/').replace('Birdhouse/', '');
}

function generateHTMLForStructure(structure, depth = 0) {
    let html = `<ul class="${depth === 0 ? 'fileList' : ''}">\n`;
    const relativePath = getRelativePath(window.location.pathname).toLocaleLowerCase();

    for (const [key, value] of Object.entries(structure)) {
        const activeClass = value.path && getRelativePath(pathToURL(value.path)).toLocaleLowerCase() === relativePath ? 'active' : '';
        const iconType = value.path || key.split('.').length > 1 ? 'description' : 'folder';
        const webPath = value.path ? pathToURL(value.path) : '#';
        const linkStart = value.path ? `<a href="${webPath}" target="_blank">${key}</a>` : `${key}`;

        html += `<li class="${activeClass}"><span class="material-icons">${iconType}</span>${linkStart}`;

        if (!value.path) {
            html += generateHTMLForStructure(value, depth + 1);
        }

        html += `</li>\n`;
    }

    html += '</ul>\n';
    return html;
}