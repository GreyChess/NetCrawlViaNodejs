var path = require("path");
var pathMap = require("./pathmap.json");
var srcDir = path.resolve(process.cwd(), "public");
var nodeModPath = path.resolve(__dirname, "./node_modules");

module.exports = {
    entry: "./src/main/views/index.js",
    mode: 'development',
    output: {
        path: path.join(__dirname, "public/javascripts"),
        // publicPath: "localhost:3000/thirdpartyjs/dist",
        filename: "bundle.js"
    },

    module: {
        rules:
            [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: path.resolve(__dirname, "node_modules"),

                }
                // {test: /\.jsx$/, loader: "jsx-loader"},
                // {test: /.css$/, loader: 'style!css'}
            ]
    },

    // devServer: {
    //     inline: false,
    //     contentBase: './dist'
    // }
    // resolve: {
    //     extensions: ['.js', "", ".css"],
    //     root: [srcDir, nodeModPath],
    //     alias: pathMap,
    //     publicPath: '/'
    // }
};