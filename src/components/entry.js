import { markdown } from '../../Birdhouse/src/modules/markdown.js';
import { updateTitleAndMeta } from '../../Birdhouse/src/main.js';

export default async function Entry(route) {
    const response = await fetch(route.markdownPath);
    const fileContent = await response.text();

    updateTitleAndMeta(route.filename, route.description);

    return `
    <p>${route.originalPath}</p>
    ${await markdown(fileContent)}
    `;
}