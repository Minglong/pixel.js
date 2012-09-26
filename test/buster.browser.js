var config = module.exports;

config["browser_tests"] = {
    env: "browser",
    rootPath: "../",
    tests: [
        "test/test.*.js",
        "test/params/test.*.js",
    ],
    sources: [ 
       "dist/pixel.browser.js" 
    ],
    resources: [{
        path: "/",
        file: "test/fixtures/index.html",
        headers: {
            "Content-Type": "text/html"
        }
    }]
};
