var config = module.exports;

config["node_tests"] = {
    env: "node",
    rootPath: "../",
    tests: [
        "test/test.*.js",
        "test/params/test.*.js",
    ]
};
