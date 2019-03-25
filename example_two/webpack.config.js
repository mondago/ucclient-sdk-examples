const HtmlWebPackPlugin = require("html-webpack-plugin")

const htmlPluginConfig = new HtmlWebPackPlugin({ template: "./src/index.html", filename: "./index.html" })

module.exports = {
    devtool: "sourcemap",
    resolve: { extensions: [".ts", ".js", ".tsx", ".jsx", ".css"] },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: "babel-loader", exclude: /node_modules/ },
            { test: /\.(ts|tsx)$/, use: "ts-loader", exclude: /node_modules/ },
            {
                test: /\.(eot|ttf|woff(2*)|svg)$/,
                exclude: [/src\/assets/],
                use: [{ loader: "file-loader", options: { name: "fonts/[hash]-[name].[ext]" } }]
            },
            { test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }] },
            {
                test: /\.less$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }]
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: [{ loader: "url-loader", options: { name: "img/[hash]-[name].[ext]" } }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [htmlPluginConfig]
}
