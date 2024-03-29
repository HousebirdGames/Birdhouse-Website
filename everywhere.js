// Required imports
import * as main from "./Birdhouse/src/main.js";
import { displayError, clearError } from "./Birdhouse/src/modules/input-validation.js";
import { markdown } from "./Birdhouse/src/modules/markdown.js";
import config from "./config.js";

import { dynamicRoutes } from './src/dynamic-routes.js';

// More hooks might become available or necessary in the future.
// Remember to keep your everywhere.js file up to date with the latest version of the example everywhere.js file.

window.hook('before-adding-base-content', async function (menuHTML) {
    const headerElement = document.getElementById("header");
    if (!headerElement) {
        return;
    }

    headerElement.innerHTML = `<img src="img/logos-originals/Birdhouse-Logo-248x248.svg" class="logo"/>
                                <div class="buttonWrap hideOnSmall">
                                <button class="openSearch"><span class="material-icons">search</span></button>
                                ${menuHTML}
                                <a href="readme.md" class="menuButton"><span class="material-icons spaceRight">subject</span><span class="linkText">Docs</span></a>
                                <button class="toggleDarkMode"><span class="material-icons">light_mode</span></button>
                                </div>
                                <div class="buttonWrap hideOnLarge">
                                <button class="toggleDarkMode"><span class="material-icons">light_mode</span></button>
                                <button class="openSearch"><span class="material-icons">search</span></button>
                                <button id="menuButton"><span class="material-icons">menu</span></button>
                                </div>
                            `;
});

window.hook('on-handle-route-change', async function () {
    // This hook will get triggered as soon as a route change is started.
});

window.hook('on-component-loaded', async function () {
    // This hook will get triggered, when a component is successfully loaded.
});

window.hook('on-content-loaded', async function () {
    main.action(showScrollTopButton);

    main.action({
        type: 'scroll',
        handler: showScrollTopButton,
        debounce: 100
    });

    main.action({
        type: 'click',
        handler: (e) => {
            scrollTo(0, 0);
            e.target.blur();
        },
        selector: '#scrollToTopButton'
    });

    let scrollTopButton = null
    function showScrollTopButton() {
        if (!scrollTopButton) {
            scrollTopButton = document.getElementById('scrollToTopButton');
        }
        if (window.scrollY > 200) {
            scrollTopButton.classList.remove('invisible');
        } else {
            scrollTopButton.classList.add('invisible');
        }
    }

    main.action({
        type: 'scroll',
        handler: () => {
            adjustButtonPosition();
        },
        debounce: 100
    });

    main.action({
        type: 'resize',
        handler: () => {
            adjustButtonPosition();
        },
        debounce: 10
    });

    main.action(adjustButtonPosition);

    const footer = document.getElementById("footer");

    function adjustButtonPosition() {
        const footerRect = footer.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const footerVisibleHeight = viewHeight - footerRect.top;
        if (footerVisibleHeight > 0) {
            scrollTopButton.style.bottom = `${16 + footerVisibleHeight}px`;
        } else {
            scrollTopButton.style.bottom = '1rem';
        }
    }

    main.action({
        type: 'click',
        handler: (e) => {
            main.popupManager.openPopup('searchPopup');
            document.getElementById('searchInput').focus();
        },
        selector: '.openSearch'
    });

    main.action({
        type: 'input',
        handler: (e) => {
            startSearch();
        },
        selector: '.searchInput',
        debounce: 100
    });

    main.action(() => {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = main.getQueryParameterByName('search');

        searchInput.value = searchTerm;
        startSearch();

        if (searchTerm) {
            setTimeout(() => {
                highlightAndScrollToSearchTerm(searchTerm);
            }, 1000);
        }
    });
});

function highlightAndScrollToSearchTerm(searchTerm) {
    const pageColumnEntry = document.querySelector('.pageColumn.entry');
    if (!pageColumnEntry || !searchTerm) return;

    function highlightText(node) {
        if (node.nodeType === 3) {
            const matchIndex = node.data.toLowerCase().indexOf(searchTerm.toLowerCase());
            if (matchIndex >= 0) {
                const matchEnd = matchIndex + searchTerm.length;

                const matchText = node.splitText(matchIndex);
                matchText.splitText(searchTerm.length);

                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'search-highlight';
                highlightSpan.textContent = matchText.data;

                matchText.parentNode.replaceChild(highlightSpan, matchText);

                return highlightSpan;
            }
        } else if (node.nodeType === 1 && node.childNodes && !/^(script|style)$/i.test(node.tagName)) {
            for (let i = 0; i < node.childNodes.length; i++) {
                const highlightSpan = highlightText(node.childNodes[i]);
                if (highlightSpan) return highlightSpan;
            }
        }
    }

    const firstHighlight = highlightText(pageColumnEntry);
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

async function searchMarkdownFiles(searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    const matchingRoutes = [];

    for (const route of dynamicRoutes) {
        try {
            const path = route.markdownPath + "?v=" + config.version;
            let content = '';
            if (sessionStorage.getItem(path)) {
                content = sessionStorage.getItem(path);
            }
            else {
                const response = await fetch(path);
                const responseText = await response.text();
                const htmlContent = await markdown(responseText);
                content = htmlContent.replace(/<span class="material-icons">[^<]*<\/span>/g, '').replace(/<[^>]*>/g, '');
                sessionStorage.setItem(path, content);
            }

            const index = content.toLowerCase().indexOf(searchTermLower);

            if (index !== -1) {
                const start = Math.max(0, index - 10);
                const end = Math.min(content.length, index + searchTerm.length + 200);

                let snippet = content.substring(start, end).replace(new RegExp(searchTerm, 'gi'), match => `<mark>${match}</mark>`);

                if (start > 0) snippet = '...' + snippet;
                if (end < content.length) snippet += '...';

                matchingRoutes.push({
                    ...route,
                    snippet
                });
            }
        } catch (error) {
            console.error(`Error fetching markdown file ${route.markdownPath}:`, error);
        }
    }

    return matchingRoutes;
}

async function startSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    if (!searchTerm) return;

    const results = await searchMarkdownFiles(searchTerm);
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No matching results found.</p>';
        return;
    }

    results.forEach(route => {
        const link = route.originalPath.replace('Birdhouse/', '').toLocaleLowerCase() + '?search=' + searchTerm;
        const searchResult = `
        <div class="searchResult">
            <a href="${link}" class="closePopup"><h3>${route.filename}</h3></a>
            <p class="justify">${route.snippet}</p>
            <a href="${link}" class="menuButton closePopup"><span class="linkText">View File</span><span class="material-icons spaceRight">arrow_right</span></a>
        </div>
        `;
        resultsContainer.innerHTML += searchResult;
    });
}

window.hook('before-actions-setup', async function () {
    main.action({
        type: 'click',
        handler: toggleDarkMode,
        selector: '.toggleDarkMode'
    });

    main.action({
        type: 'click',
        handler: (e) => {
            CopyToClipboard(e.target.innerHTML, false);
            e.target.classList.remove('copied');
            setTimeout(() => {
                e.target.classList.add('copied');
            }, 0);
        },
        selector: 'pre code',
        container: '#content'
    });

    main.action({
        type: 'click',
        handler: (e) => {
            const dataValue = e.target.dataset.copy;
            CopyToClipboard(dataValue, false);
            e.target.classList.remove('copied');
            setTimeout(() => {
                e.target.classList.add('copied');
            }, 0);
        },
        selector: '.copyData',
        container: '#content'
    });

    main.action({
        type: 'click',
        handler: (e) => {
            setTimeout(() => {
                CopyToClipboard(window.location.href, true)
                hashChange();
            }, 100);
        },
        selector: '.copyLink',
        container: '#content'
    });

    main.action(hashChange);

    main.action({
        type: 'scroll',
        handler: hashChange,
        debounce: 100
    });

    function hashChange() {
        const oldActive = document.querySelector('.activeAnchor');
        if (oldActive) {
            oldActive.classList.remove('activeAnchor');
        }

        // Add the class to the current active anchor target
        const hash = window.location.hash.substring(1); // Get the hash and remove the '#'
        const target = document.getElementById(hash);
        if (target) {
            target.classList.add('activeAnchor');
        }
    }
});

async function toggleDarkMode(event) {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        main.removeCSS('themes/darkmode.css');
        localStorage.setItem('darkMode', 'false');
    } else {
        main.removeCSS('themes/darkmode.css');
        await main.loadCSS('themes/darkmode.css');
        localStorage.setItem('darkMode', 'true');
    }
}

window.hook('on-actions-setup', async function () {
    // This hook will get triggered, when the actions are invoked and set up.
});

window.hook('get-popup-menu-html', async function (menuHTML) {
    return `
    <div id="menu" class="popup">
		<div class="menuList fade-left-menu">
            <div class="pageRow centered">
            <img src="img/logos-originals/Birdhouse-Logo-248x248.svg" class="logo"/>
            <h1>Birdhouse</h1>
            </div>
            <br>
            ${menuHTML}
            <a href="readme.md" class="menuButton closePopup"><span class="material-icons spaceRight">subject</span><span class="linkText">Documentation</span></a>
            <br>
			<button class="closePopup menu menuButton"><span class="material-icons md-light spaceRight">close</span><span class="linkText">Close</span></button>
		</div>
	</div>
    `;
});

window.hook('page-loaded', async function () {
    await onPageLoaded();
});

async function onPageLoaded() {
    main.addBaseContent(`
        <button id="scrollToTopButton" class="invisible"><span class="material-icons">keyboard_double_arrow_up</span></button>
        
        <div id="searchPopup" class="popup">
		<div class="popup-content big">
            <h1>Search</h1>
            <label><input type="text" id="searchInput" class="searchInput" placeholder="Search..." /></label>
            <div id="searchResults">
		    </div>
            <button class="closePopup"><i class="material-icons">close</i></button>
            <button class="closePopup closePopupIcon"><i class="material-icons">close</i></button>
		</div>
	    </div>
    `);

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        await main.loadCSS('themes/darkmode.css');
    }
}

window.hook('user-logged-in', async function () {
    // Triggered when a user is logged in
});

window.hook('add-markdown-patterns', async function (html) {
    // Let's add some custom markdown patterns
    /* const examplePattern = /\[example_pattern\]/g;

    // We can replcae the pattern with some HTML, even a with a whole component
    html = html.replace(examplePattern, await Example()); */

    return html;
});

window.hook('create-routes', async function () {
    // Let's create some routes.
    // Each route type will be added to the menu, based on the user's role.
    // So the menuHTML will be different for the public and user. The admin is also a user.
    // Of course, you can also create routes conditionally, for example based on time of day or user role.
    // You can even overwrite routes. So if you create a route with the same path, the previously defined route will be overwritten.

    // As we want something to view on our front page, let's reuse the example component, but not add it to the menu.
    main.createPublicRoute('/', 'Home', 'home', 'components/home', true, null, false);
    main.createPublicRoute('/get-started', 'Get started', 'done_all', 'components/get-started', true);
    main.createPublicRoute('/index.html', 'Home', 'list', 'components/home', false);
    main.createPublicRoute('/privacy-policy', 'Privacy Policy', '', 'components/privacy-policy', false);
});

window.hook('get-cookies-list', async function () {
    // Let's add some default cookies to the list.

    let cookies = [
        'storageAcknowledgement',
        'lastUpdateNote',
        'PHPSESSID'
    ];

    return cookies;
});

window.hook('get-allowed-paths-during-maintenance', async function () {
    // Let's add some paths that are allowed during maintenance.

    let allowedPathsDuringMaintenance = [
        'login',
        'login-password',
        'logout',
        'contact',
        'privacy-policy',
        'terms-of-service'
    ];

    return allowedPathsDuringMaintenance;
});

window.hook('get-spa-excluded-links', async function () {
    // Let's add some routes that are excluded from the single page application route handling.

    let excludedRoutes = [
        'database/logout.php',
    ];

    return excludedRoutes;
});

window.hook('get-storage-acknowledgement-popup-content', async function () {
    // Let's add some content to the storage acknowledgement popup.

    const content = `
            <h1>Welcome!</h1>
			<p>By clicking "I Understand and Agree", you allow this site to store cookies on your device and use the browsers local storage. These following cookies and local storage entries are used to enable improve your experience:</p>
            <ul>
            <li>A cookie ensures that you won't see this message pop up on your subsequent visits or page reloads.</li>
            <li>Another cookie remembers which version of the website you last confirmed on the Update Notes, saving you from repeated update popups on every page load.</li>
            <li>Login will require a cookie and if you are logged in, additional cookies and local storage entries are used to provide further functionality.</li>
            </ul>
            <p>These cookies and the use of local storage entries are necessary for the smooth functioning of our site. If you choose to close this popup without clicking "I Understand and Agree", nothing will be stored. If you deny the permission, session storage will be used to hide this popup. Thank you for your understanding!</p>
        `;

    return content;
});

window.hook('generate-menu-html', async function (menuItems) {
    // Here you can modify how the menuHTML is generated from the menu items that are created with createPublicRoute, createUserRoute and createAdminRoute.

    return menuItems
        .map(item => {
            let classes = 'menuButton closePopup';
            let extraHTML = '';
            if (item.materialIcon != '') {
                let additionClass = item.hasName ? "spaceRight" : "";
                extraHTML = `<span class="material-icons ${additionClass}">${item.materialIcon}</span>`;
            }
            return `<a href="${item.path}" class="${classes} text-${item.displayFull}">${extraHTML}<span class="linkText">${item.name}</span></a>`;
        })
        .join('');
});

window.hook('fetch-user-data', async function () {
    // Let's return some default user data. Normally you would fetch this from a database.

    //You can try the different user examples by uncommenting them one by one.

    //Remember to set userLoginEnabled to true in config.js to enable the user login system.

    //Admin user
    /* const userData = {
        'loggedIn': true,
        'userId': '0',
        'username': 'Example Admin',
        'isAdmin': true,
        'isUser': true,
    }; */

    //Normal user
    /* const userData = {
        'loggedIn': true,
        'userId': '1',
        'username': 'Example User',
        'isAdmin': false,
        'isUser': true,
    }; */

    //Not logged in user
    const userData = {
        'loggedIn': false,
        'userId': '',
        'username': '',
        'isAdmin': false,
        'isUser': false,
    };

    return new Response(JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' },
    });
});

window.hook('check-remember-me', async function () {
    // If your backend confirms that the user is remembered (i.e. Token accepted), return true.
    // Returning true here, will then reload the page.

    return false;
});

window.hook('get-maintenance-mode', async function () {
    // Here you would fetch the maintenance mode status from your backend.

    return false;
});

window.hook('add-dynamic-routes', async function (path) {
    for (let route of dynamicRoutes) {
        if (route.originalPath.replace('Birdhouse/', '').toLocaleLowerCase() === path) {
            main.createPublicRoute(route.originalPath.replace('Birdhouse/', '/'), route.filename, '', 'components/entry', false, route);
            return true;
        }
    }
    console.log('No dynamic route found for:', path);
    return false;
});

window.hook('database-get-setting', async function (name, cacheSetting) {
    // Here you would fetch a setting from your backend.
    // In this example, we just return a default setting as a json response.
    if (name === 'info_text') {
        return new Response(JSON.stringify({ value: '' }), {
            headers: { 'Content-Type': 'application/json' },
        });
        return new Response(JSON.stringify({ value: 'This website and the documentation are work in progess' }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ value: 'exampleSetting' }), {
        headers: { 'Content-Type': 'application/json' },
    });
});

window.hook('database-set-setting', async function (name, value) {
    // Here you would set a setting in your backend.
    // In this example, we just return a success message as a json response.

    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
    });
});

window.hook('send-analytics', async function (value) {
    // Here you would send analytics data to your backend.
    // In this example, we just log the value to the console.

    //console.log('Analytics:', value);
});

window.hook('validate-field', async function (input, value, errorElement, serverSide) {
    // This hook is triggered when a field is validated. You can use it to add custom validation rules.
    // If there are no errors, the error of the field will be cleared automatically if nothing or true is returned.

    if (input.name === 'exampleInput' && value.length != 8) {
        displayError(input, errorElement, 'Example input must be 8 characters long.');
        return false;
    }

    // You can also clear the error of another field (not the one that is currently being validated) by using the clearError(input, errorElement) function.

    if (serverSide) {
        // Here you can add server side validation. For example, you could check if a username already exists in your database.
        // The server side validation has a longer debounce to reduce the amount of requests to your server.

        /* const response = await checkUsernameExistence(value);
        if (response.exists) {
            displayError(input, errorElement, 'Username already exists.');
            return false;
        } */
    }

    //Please remember, that all input/textarea elements should have a label element surrounding them. This is needed for the automatic error message placement.
});

window.hook('get-loading-content', async function () {
    //This will be in the content section until the current component is loaded. You can place skeleton loaders or a loading symbol here or just return an empty string.

    return `
    `;
});