[h1]README.md[/h1]
[p]You can [a href=^https://github.com/HousebirdGames/Birdhouse/blob/main/README.md^]view this file on GitHub[/a].[/p]<p align="center">
  <img src="https://birdhouse-js.com/img/icons/Icon-3000x3000.png" width="200">
</p>

<h1><strong>The Birdhouse Framework</strong></h1>
<h2>Introduction</h2>
<p><strong>Birdhouse</strong> is a Vanilla JavaScript framework for Single Page Applications and supports easy Progressive Web App rollouts through its NodeJS Pipeline. Birdhouse is primarily designed for deployment to Apache Webserver Webspaces via SFTP. However, with necessary modifications, it can also be adapted for use in other environments. Everything is provided as is.</p>
<p>The Framework is a lightweight way to have a web app that mainly utilizes the resources of the users device. You can always integrate a backend, that allows for more functionality, but this framework is aimed at providing full offline capabilities to the enduser.</p>
<h2>Documentation</h2>
<p>Access comprehensive Birdhouse documentation at <a href="https://birdhouse-js.com">birdhouse-js.com</a>.</p>
<p>For private, local access to the documentation, leverage the <a href="https://github.com/HousebirdGames/Birdhouse-Website">official Birdhouse Doumentation Website GitHub repository</a>. Simply clone the repository and deploy it locally, for example, with XAMPP or using the local development server (instructions below).</p>
<p>Keep up with the latest updates by viewing <a href="https://github.com/HousebirdGames/Birdhouse/commits/main/">the commit history on GitHub</a> or <a href="https://birdhouse-js.com/changelog">the changelog on the documentation website</a>.</p>
<h2>Logo and Name Use Guidelines Notice</h2>
<p>When using the Birdhouse Framework in your projects, please adhere to our <a href="https://github.com/HousebirdGames/Birdhouse/blob/main/GUIDELINES.md">Logo and Name Use Guidelines</a> to ensure respectful and correct usage of our brand assets.</p>
<h2>License</h2>
<p>The Birdhouse Framework is open source software licensed under the <a href="https://opensource.org/licenses/MIT">MIT license</a>. This license grants you the permission to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the following conditions:</p>
<ul>
<li><strong>Acknowledgment:</strong> While not required, we appreciate acknowledgment or attribution when the Birdhouse Framework is used in a project. This can be in the form of a link back to our <a href="https://github.com/HousebirdGames/Birdhouse">GitHub repository</a> or our official website, <a href="https://birdhouse-js.com">birdhouse-js.com</a>.</li>
<li><strong>Logo and Name Use:</strong> The use of the Birdhouse Framework logo and name is governed by our Logo and Name Use Guidelines, which are designed to ensure the respectful and correct usage of our brand assets. Please refer to these guidelines for more details on how to use the Birdhouse Framework logo and name in your projects.</li>
</ul>
<p>This license does not require you to make your own project open source if you use the Birdhouse Framework.</p>
<h2>Quick Start</h2>
<p>Follow these steps to get the project up and running on your local machine:</p>
<ol>
<li><p>Clone the repository from GitHub. <strong>The Birdhouse repo has to be in the <code>Birdhouse</code>-subdirectory of your project.</strong> If you have <a href="https://git-scm.com/downloads">Git</a> installed on your machine, you can do this by navigating to your project directory and executing the following command:</p>
<pre><code class="language-bash">git clone https://github.com/HousebirdGames/Birdhouse.git
</code></pre>
<p> <strong>OR</strong></p>
<p> If your project is already using Git, it&#39;s recommended to add <strong>Birdhouse</strong> as a submodule (this can also be done later). To do this, use the following command:</p>
<pre><code class="language-bash">git submodule add https://github.com/HousebirdGames/Birdhouse ./Birdhouse
</code></pre>
</li>
<li><p>Change your current directory to the one that was created when you cloned the repository:</p>
<pre><code class="language-bash">cd Birdhouse
</code></pre>
</li>
<li><p>Install the project pipeline dependencies and initialize the project:</p>
<pre><code class="language-bash">npm run start
</code></pre>
</li>
</ol>
<p><strong>Note:</strong> If you ever change the name of you project directory, remember to update the localhost <code>.htaccess</code> file to reflect the new directory name.</p>
<p>At this point, you&#39;re ready to configure your project. You&#39;ll find the configuration files your root directory:</p>
<ul>
<li><code>config.js</code>: This file contains the main configuration for the project.</li>
<li><code>pipeline-config.js</code>: This file contains the configuration for the deployment pipeline.</li>
</ul>
<p>Open these files in your text editor and adjust the settings to match your project&#39;s requirements.</p>
<p>Once you&#39;ve finished configuring the project, you can run it on your local machine. If you&#39;re using <a href="https://www.apachefriends.org/index.html">XAMPP</a>, start the XAMPP control panel, ensure Apache is running, and then navigate to the project in your web browser.</p>
<p><strong>Important:</strong> Do not change the service-worker.js. It will get recopied to root on deployment and on root updates.</p>
<h2>Local Development Server <strong>(experimental)</strong></h2>
<p>The Birdhouse Framework includes a script, <code>server.js</code>, designed to simplify local development by serving your application directly from your development environment. This script is integral to simulating an Apache server environment, ensuring that your application behaves consistently between development and production. While <code>server.js</code> can function independently for basic tasks, it is primarily meant to be used alongside the <code>serve.js</code> script, which handles automatic file watching, building, and server restarting.</p>
<p>To use <code>serve.js</code>, ensure you are in the <code>Birdhouse</code> directory, then execute these commands:</p>
<p>If you have not already, cd in to Birdhouse.</p>
<pre><code class="language-bash">cd Birdhouse
</code></pre>
<p>Then make sure all node modules are installed.</p>
<pre><code class="language-bash">npm install
</code></pre>
<p>Now you can serve the app locally.</p>
<pre><code class="language-bash">node serve
</code></pre>
<p>or</p>
<pre><code class="language-bash">npm run serve
</code></pre>
<p>You can also specify a port like this (default: 4200):</p>
<pre><code class="language-bash">node serve 3000
</code></pre>
<p> This starts the local server and begins serving your project from the <code>dist</code> directory, automatically applying any Apache-like .htaccess rules you have configured for HTTP headers. The terminal will provide the URL with the default or specified port.</p>
<p>This setup not only mimics the production environment closely but also allows you to test changes instantly without manual refreshes, although you should manually reload your browser to see updates.</p>
<p><strong>Important:</strong> Remember, <code>serve.js</code> and <code>server.js</code> are for local development purposes only and should not be used as a production server.</p>
<h2>Project Structure</h2>
<p>To utilize the pipeline, ensure you&#39;re in the Birdhouse directory by executing:</p>
<pre><code class="language-bash">cd Birdhouse
</code></pre>
<p>Avoid making changes to the files in the Birdhouse directory, as future updates to the Birdhouse repository may overwrite them. To generate or update the configuration files (except <code>sftp-config.js</code>) in your root folder, execute the following command:</p>
<pre><code class="language-NODE">node pipeline -u
</code></pre>
<p>To generate or update the necessary root files (including <code>sftp-config.js.EXAMPLE</code>), use this command:</p>
<pre><code class="language-NODE">node pipeline -r
</code></pre>
<p>To learn more about the available command line options, keep reading the sections below.</p>
<p><strong>Important:</strong> Keep all changes you make inside the <code>custom</code> folder, so that you can always update the framework or just put your <code>custom</code> folder in a new one.</p>
<h2>The Pipeline</h2>
<h3>Key Features of <code>pipeline.js</code>:</h3>
<ul>
<li>Incremental versioning control.</li>
<li>Directory and file cache management.</li>
<li>SFTP upload functionality.</li>
<li>Support for multiple deployment paths (production/staging).</li>
<li>Clean and user-friendly console interface with progress indicators and colored output.</li>
<li>Command line flexibility for different deployment scenarios.</li>
</ul>
<p>Ensure to keep the <code>pipeline-config.js</code> updated with any changes in project structure or deployment requirements.</p>
<h2>Release Process</h2>
<p><strong>Note:</strong> You should configure the <code>manifest.json</code>, <code>sitemap.xml</code> and <code>robots.txt</code> to fit your project.</p>
<p>The <code>pipeline.js</code> script streamlines the release process. It will automatically compress any images from <code>uncompressedDir</code> to the <code>compressedDir</code>.</p>
<h3>Setting Up the Pipeline</h3>
<p>To get started with deploying your Birdhouse project, you&#39;ll need to configure the deployment pipeline. This involves setting up configuration files for the pipeline itself and for secure file transfer (SFTP). Follow these steps to ensure everything is set up correctly:</p>
<ol>
<li><p><strong>Configure the Pipeline:</strong></p>
<p>Edit the <code>pipeline-config.js</code> file located in your Birdhouse directory. This file contains settings specific to your project, such as deployment targets and versioning. Fill in the necessary details according to your project&#39;s requirements.</p>
</li>
<li><p><strong>Set Up SFTP:</strong></p>
<p>Next, adjust the <code>sftp-config.js</code> file to match your server&#39;s SFTP connection details. This configuration enables the pipeline to upload your project files to the server.</p>
</li>
<li><p><strong>Configuration:</strong></p>
<p>For additional security and to make the SFTP configuration reusable for other Birdhouse projects, move the <code>sftp-config.js</code> file to the parent directory of your Birdhouse project. This separation ensures that sensitive information, like server credentials, is not stored within the project directory, reducing the risk of accidental exposure.</p>
</li>
</ol>
<p>Make sure your are in the Birdhouse directory:</p>
<pre><code class="language-bash">cd Birdhouse
</code></pre>
<ol>
<li>Run <code>npm install</code> to install dependencies, if you haven&#39;t already.</li>
<li>Execute the script <code>node pipeline.js</code>. This begins the release process.</li>
<li>Use the <code>-c</code> option to update the cache file list and the <code>-m</code> option to minify .js and .css files before uploading them.</li>
<li>Use <code>-p</code> to upload the web app via SFTP to production.</li>
<li>To specify a new version, use <code>-v</code> or <code>-version</code> followed by the number or without a number for an incremental version change.</li>
</ol>
<p><strong>Example:</strong></p>
<pre><code class="language-NODE">pipeline.js -p -c -m -v 1.2.3.4
</code></pre>
<p><strong>Important:</strong> Some files (like <code>service-worker.js</code>) are placed within <code>Birdhouse/root</code> and will be copied to the root of the project. This will be done automatically on deployment, but can also be triggered with the <code>-root</code>-flag.</p>
<h3>Utilizing Pre- and Post-Release Scripts</h3>
<p>For advanced deployment scenarios, your Birdhouse project might require the execution of additional Node.js scripts either before or after the deployment process. This feature is especially useful for tasks such as database migrations, environment setup, or cleanup operations that need to run in conjunction with your deployment workflow.</p>
<p>To integrate these tasks into your deployment process, you can specify them in the <code>pipeline-config.js</code> file within the Birdhouse directory. Add the relative paths to your scripts to the <code>preReleaseScripts</code> array for scripts that need to run before deployment, and to the <code>postReleaseScripts</code> array for scripts that should run after deployment. This configuration ensures that your scripts are executed automatically at the appropriate time during the deployment to either production or staging environments.</p>
<h4>Example Configuration</h4>
<pre><code class="language-javascript">// In pipeline-config.js
module.exports = {
  // Other configurations...
  preReleaseScripts: [
    &#39;scripts/pre-deploy-script.js&#39;
  ],
  postReleaseScripts: [
    &#39;scripts/post-deploy-script.js&#39;
  ]
};
</code></pre>
<p>This setup automatically calls <code>pre-deploy-script.js</code> (located in the scripts folder of your projects root directory) before initiating the deployment process and <code>post-deploy-script.js</code> after the deployment completes successfully. Make sure your scripts are idempotent (i.e., they can run multiple times without causing issues) and have proper error handling to avoid disrupting the deployment process.</p>
<h3>Command Line Options:</h3>
<ul>
<li><code>-help</code>, <code>-h</code> or no flag: Display help message and exit. <strong>(STRONGLY RECOMMENDED to get more detailed and up to date information)</strong></li>
<li><code>-update</code> or <code>-u</code>: Updates or creates the config.js and config-pipeline.js with necessary entries, orders them and exits.</li>
<li><code>-root</code> or <code>-r</code>: Copies all files from /Birdhouse/root to the root directory and exits.</li>
<li><code>-production</code> or <code>-p</code>: Release to the production environment.</li>
<li><code>-staging</code> or <code>-s</code>: Release to the staging environment.</li>
<li><code>-local</code> or <code>-l</code>: Builds the project to the local dist directory and thereby skips the upload to the server (so -p and -s are ignored).</li>
<li><code>-forced &lt;-p|-s|-l&gt;</code>: Forces the update (triggers a page reload after the new version is cached on the user&#39;s device), without notifying the user.</li>
<li><code>-silent &lt;-p|-s|-l&gt;</code>: Performs a silent update which does not display the update notification and becomes active after the next page reload.</li>
<li><code>-version</code> or <code>-v</code>: Update the version of the <code>service-worker.js</code>.</li>
<li><code>-cache</code> or <code>-c</code>: (Re-)Generate the <code>filesToCache.js</code> file.</li>
<li><code>-minify</code> or <code>-m</code>: Minifies the files in filesToCache.js (before uploading them to the server; if not set, the original files will be uploaded).</li>
<li><code>-delete</code> or <code>-d</code>: Delete the application directory (production, staging or local) from the server.</li>
<li><code>-backup</code> or <code>-b</code>: Creates a backup before deploying the new version that can be rolled back to.</li>
<li><code>-rollback</code> or <code>-r</code>: Rollback to the backup version of either staging (<code>-s</code>) or production (<code>-p</code>), when available on the server.</li>
<li><code>-info</code> or <code>-i</code>: Display detailed information about the process.</li>
<li><code>-skipCompU</code> or <code>-su</code>: Skips image compression and upload of the compressed folder, which is faster in some scenarios, where repeated uploads of the folder are not neccessary.</li>
<li><code>-genFavicons</code> or <code>-gf</code>: Creates favicons of all specified (or the default) sizes from the original favicon and exits after that.</li>
<li><code>-genIcons</code> or <code>-gi</code>: Creates icons of all specified (or the default) sizes from the original icon and exits after that.</li>
<li><code>-genAppIcons</code> or <code>-ga</code>: Creates .icon (paths are configured in the pipeline-config.js) and exits after that.</li>
<li><code>-noLog</code> or <code>-nl</code>: No statistics will be logged and added to the log file.</li>
</ul>
<p>The script automates various tasks, including version number updates, cache list generation, and file uploads to the server. Ensure you have the necessary permissions for file operations and SFTP server access.</p>
