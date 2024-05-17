import { updateTitleAndMeta } from "../../Birdhouse/src/main.js";

export default async function GetStarted() {
    updateTitleAndMeta("Get Started", "Get started with Birdhouse by viewing the Readme, Changelog, and Guidelines. Explore example files and additional documentation.");

    return `
    <div class="pageRow centered">
        <img src="img/logos-originals/Birdhouse-Logo-248x248.svg" class="logo big" alt="Logo of the Birdhouse Framework"/>
        <h1>Get Started</h1>
    </div>
    <div class="centerContent">
        <p class="justify">Welcome to Birdhouse! This guide will help you get started with the framework by providing an overview of essential resources and documentation. Follow the sections below to set up and explore Birdhouse effectively.</p>

        <h2>Introduction and Basic Setup</h2>
        <p class="justify">Before diving into the details, it's important to understand what Birdhouse is and how to get started with it. The following resources will guide you through the initial setup and basic configuration.</p>
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

        <h2>Example Files</h2>
        <p class="justify">Once you've set up Birdhouse, you can explore example files that demonstrate the usage of various features and functionalities. These examples are a great way to get hands-on experience.</p>
        <div class="contentRow">
            <p class="justify">Upon initialization, Birdhouse deploys example files that illustrate the use of hooks, functions, and more. These examples are a great way to begin experimenting.</p>
            <div class="buttonRow">
                <a class="menuButton" href="root_EXAMPLE/everywhere.js">Example everywhere.js</a>
                <a class="menuButton" href="root_EXAMPLE/src/components/example.js">Example Component</a>
            </div>
        </div>

        <h2>Additional Documentation</h2>
        <p class="justify">To fully leverage the capabilities of Birdhouse, it's important to explore the additional documentation. This section provides links to key files that offer more in-depth information about the framework's features.</p>
        <div class="contentRow">
            <p class="justify">
            Consider exploring additional documentation to discover the features Birdhouse offers.
            <br><br>
            Here are some files you might find interesting to visit first, like main.js, which provides routing functions and the actions system, among others.
            <br><br>
            The Hooks Overview page provides a detailed explanation of the available hooks in Birdhouse.
            </p>
            <div class="buttonRow">
                <a class="menuButton" href="hooks">Hooks Overview</a>
                <a class="menuButton" href="src/main.js">main.js</a>
                <a class="menuButton" href="src/modules/infinite-scroll.js">infinite-scroll.js</a>
                <a class="menuButton" href="src/modules/popupManager.js">popupManager.js</a>
                <a class="menuButton" href="src/modules/input-validation.js">input-validation.js</a>
            </div>
        </div>
    </div>
    `;
}