import { markdown } from '../../Birdhouse/src/modules/markdown.js';
import { updateTitleAndMeta, loadCSS, action } from '../../Birdhouse/src/main.js';
import Structure from './structure.js';

export default async function Entry(route) {
    const response = await fetch(route.markdownPath);
    const fileContent = await response.text();

    updateTitleAndMeta(route.filename, route.description);

    action(checkForContent);

    loadCSS('src/components/structure.css');

    return `
    <div class="pageRow">
        <div class="pageColumn structure">
        <a href="hooks" class="menuButton noBreak"><span class="material-icons spaceRight">phishing</span>View all Hooks</a>
        ${await Structure()}
        </div>
        <div class="pageColumn entry">
            <div class="buttonWrap start">
                <a href="#birdhouseStructure" class="menuButton hideOnLarge"><span class="material-icons spaceRight">keyboard_double_arrow_down</span>To Structure</a>
                <a href="#variables" id="variablesAnchorButton" class="menuButton hidden"><span class="material-icons spaceRight">keyboard_double_arrow_down</span>To Variables</a>
                <a href="#functions" id="functionsAnchorButton" class="menuButton hidden"><span class="material-icons spaceRight">keyboard_double_arrow_down</span>To Functions</a>
            </div>
            <p class="filePath"><span class="material-icons spaceRight">description</span>${route.originalPath}</p>
            ${await markdown(fileContent)}
        </div>
    </div>
    `;
}

function checkForContent() {
    const functions = document.getElementById('functions');
    if (functions) {
        document.getElementById('functionsAnchorButton').classList.remove('hidden');
    }

    const variables = document.getElementById('variables');
    if (variables) {
        document.getElementById('variablesAnchorButton').classList.remove('hidden');
    }
}