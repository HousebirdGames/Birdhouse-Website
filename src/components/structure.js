import { birdhouseStructure } from '../birdhouse-structure.js';
import { getRelativePath } from '../../Birdhouse/src/main.js';

export default async function Structure() {
    return `
    <h2 id="birdhouseStructure">Files</h2>
    <div class="birdhouse-structure">
        ${generateHTMLForStructure(birdhouseStructure)}
    </div>
    `;
}

function pathToURL(path) {
    return path.replace(/\\/g, '/').replace('Birdhouse/', '');
}

function generateHTMLForStructure(structure, depth = 0) {
    const relativePath = getRelativePath(window.location.pathname).toLowerCase();
    let html = '';

    const entries = Object.entries(structure);
    if (entries.length > 0) {
        html += `<ul class="${depth === 0 ? 'fileList' : ''}">\n`;

        for (const [key, value] of entries) {
            const activeClass = value.path && getRelativePath(pathToURL(value.path)).toLowerCase() === relativePath ? 'active' : '';
            const iconType = value.path || key.split('.').length > 1 ? 'description' : 'folder';
            const webPath = value.path ? pathToURL(value.path) : '#';
            const linkStart = value.path
                ? (activeClass === 'active'
                    ? `<div class="noBreak"><span class="material-icons">${iconType}</span>${key}</div>`
                    : `<a href="${webPath}" class="noBreak"><span class="material-icons">${iconType}</span>${key}</a>`)
                : `<span class="material-icons">${iconType}</span>${key}`;

            html += `<li class="${iconType} ${activeClass}">${linkStart}`;

            if (!value.path) {
                const childrenHtml = generateHTMLForStructure(value, depth + 1);
                if (childrenHtml) {
                    html += childrenHtml;
                }
            }

            html += `</li>\n`;
        }

        html += '</ul>\n';
    }

    return html;
}