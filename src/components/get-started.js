import { updateTitleAndMeta } from "../../Birdhouse/src/main.js";

export default async function Home() {
    updateTitleAndMeta("Get Started", "Get started with Birdhouse by viewing the Readme, Changelog, and Guidelines. Explore example files and additional documentation.");

    return `
    <div class="pageRow centered">
    <img src="img/logos-originals/Birdhouse-Logo-248x248.svg" class="logo big" alt="Logo of the Birdhouse Framework"/>
    <h1>Get Started</h1>
    </div>
    <div class="centerContent">
        <div class="contentRow">
            <p class="justify">The Readme provides instructions on setting up Birdhouse and configuring the pipeline. It's the perfect starting point for new users.
            <br><br>The changelog lists all the commits made to the project, so you can keep track of the latest updates.
            <br><br>Also please make sure that you adhere to our guidelines.
            </p>
            <div class="buttonRow">
                <a class="menuButton" href="readme.md">View Readme</a>
                <a class="menuButton" href="changelog">View Changelog</a>
                <a class="menuButton" href="guidelines.md">View Guidelines</a>
                <a class="menuButton" href="license.txt">View License</a>
            </div>
        </div>
        <div class="contentRow">
        <p class="justify">Upon initialization, Birdhouse deploys example files that illustrate the use of hooks, functions, and more. These examples are a great way to begin experimenting.</p>
            <div class="buttonRow">
                <a class="menuButton" href="root_EXAMPLE/everywhere.js">Example everywhere.js</a>
                <a class="menuButton" href="root_EXAMPLE/src/components/example.js">Example Component</a>
            </div>
        </div>
        <div class="contentRow">
            <p class="justify">Next, consider exploring additional documentation to discover the features Birdhouse offers. Here are some files you might find interesting to visit first, like main.js, which provides routing functions and the actions system, among others.</p>
            <div class="buttonRow">
                <a class="menuButton" href="src/main.js">main.js</a>
                <a class="menuButton" href="src/modules/hooks.js">hooks.js</a>
                <a class="menuButton" href="src/modules/infinite-scroll.js">infinite-scroll.js</a>
                <a class="menuButton" href="src/modules/popupManager.js">popupManager.js</a>
                <a class="menuButton" href="src/modules/input-validation.js">input-validation.js</a>
            </div>
        </div>
    </div>
    `;
}