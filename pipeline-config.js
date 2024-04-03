module.exports = {
    sftpConfigFile: "../sftp-config.js",
    productionPath: "birdhouse_website",
    stagingPath: "birdhouse_website_staging",
    htaccessFile: "UPLOAD-THIS.htaccess",
    basePath: "/",
    databaseDir: "",
    uncompressedDir: "img/uploads-uncompressed",
    compressedDir: "uploads",
    faviconPath: "img/logos-originals/Birdhouse-Logo.jpg",
    faviconsOutputDir: "img/favicons",
    faviconsFileName: "Favicon",
    faviconSizes: [

    ],
    manifestIconPath: "img/logos-originals/Birdhouse-Logo.jpg",
    manifestIconOutputDir: "img/icons",
    manifestIconFileName: "Icon",
    manifestIconSizes: [

    ],
    statisticsFile: "pipeline-log.txt",
    ignoredFileTypes: [
        ".zip",
        ".rar",
        ".txt",
        ".psd",
        ".htaccess"
    ],
    directoriesToInclude: [
        "src",
        "fonts",
        "img/favicons",
        "img/icons",
        "img/screenshots",
        "img/logos-originals",
        "uploads",
        "docs",
        "themes"
    ],
    directoriesToExcludeFromCache: [
        "img/screenshots",
        "uploads"
    ],
    preReleaseScripts: [
        'documentation.js'
    ],
    postReleaseScripts: [

    ]
};