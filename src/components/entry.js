import { markdown } from '../../Birdhouse/src/modules/markdown.js';
import { updateTitleAndMeta, loadCSS } from '../../Birdhouse/src/main.js';
import Structure from './structure.js';

export default async function Entry(route) {
    const response = await fetch(route.markdownPath);
    const fileContent = await response.text();

    updateTitleAndMeta(route.filename, route.description);

    loadCSS('src/components/structure.css');

    return `
    <div class="pageRow">
        <div class="pageColumn second">
        ${await Structure()}
        </div>
        <div class="pageColumn">
            <p class="filePath"><span class="material-icons spaceRight">description</span>${route.originalPath}</p>
            ${await markdown(fileContent)}
        </div>
    </div>
    `;
}