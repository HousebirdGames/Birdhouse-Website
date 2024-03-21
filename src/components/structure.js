import { birdhouseStructure } from '../birdhouse-structure.js';
import { getRelativePath } from '../../Birdhouse/src/main.js';

export default async function Structure() {

    return `
    <h1>Birdhouse Structure</h1>
    ${generateHTMLForStructure(birdhouseStructure)}
    `;
}

function pathToURL(path) {
    return path.replace(/\\/g, '/').replace('Birdhouse/', '');
}

function generateHTMLForStructure(structure, depth = 0) {
    let html = depth === 0 ? `<ul class="fileList">\n` : '<ul>\n';
    const relativePath = getRelativePath(window.location.pathname).toLocaleLowerCase();

    for (const [key, value] of Object.entries(structure)) {
        if (value.path) {
            const webPath = pathToURL(value.path);
            html += `<li ${getRelativePath(webPath).toLocaleLowerCase() == relativePath ? 'class="active"' : ''}>${'&nbsp;'.repeat(depth * 5)}${depth > 0 ? '<span class="material-icons subdirectory">subdirectory_arrow_right</span>' : ''}<span class="material-icons spaceRight">description</span><a href="${webPath}" target="_blank">${key}</a></li>\n`;
        }
        else if (key.split('.').length > 1) {
            html += `<li>${'&nbsp;'.repeat(depth * 5)}${depth > 0 ? '<span class="material-icons subdirectory">subdirectory_arrow_right</span>' : ''}<span class="material-icons spaceRight">description</span>${key}</li>\n`;
        }
        else {
            html += `<li>${'&nbsp;'.repeat(depth * 5)}${depth > 0 ? '<span class="material-icons subdirectory">subdirectory_arrow_right</span>' : ''}<span class="material-icons spaceRight">folder</span>${key}${generateHTMLForStructure(value, depth + 1)}</li>\n`;
        }
    }

    html += '</ul>\n';
    return html;
}