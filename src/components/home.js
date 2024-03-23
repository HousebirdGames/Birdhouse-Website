export default async function Home() {

    return `
    <div class="pageRow centered">
    <img src="img/logos-originals/Birdhouse-Logo-248x248.svg" class="logo big"/>
    <h1>Welcome to Birdhouse</h1>
    </div>
    <div class="centerContent">
    <p class="justify">Birdhouse is a Vanilla JavaScript framework for Single Page Applications and supports easy Progressive Web App rollouts through its NodeJS Pipeline. Birdhouse is primarily designed for deployment to Apache Webserver Webspaces via SFTP. However, with necessary modifications, it can also be adapted for use in other environments. Everything is provided as is.</p>
    <br>
    <p class="justify">On this website you will find the documentation, highlighting functions and variables that Birdhouse provides as well as information on how to get started.</p>
    <br>
    <div class="buttonWrap">
    <a class="menuButton" href="readme.md">Get Started</a>
    <a class="menuButton" href="https://github.com/HousebirdGames/Birdhouse">View on GitHub</a>
    </div>
    <br>
    <p class="justify">The Framework is a lightweight way to have a web app that mainly utilizes the resources of the users device. You can always integrate a backend, that allows for more functionality, but this framework is aimed at providing full offline capabilities to the enduser.</p>
    </div>
    `;
}