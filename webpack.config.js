const path = require('path');
const HtmlWebpackPlug = require('html-webpack-plugin');

jsRules = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }
    }
}

styleRules = {
    test: /\.css/,
    use: ["style-loader", "css-loader"]
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: {
        port: 8081,
        liveReload: true
    },
    module: {
        rules: [jsRules, styleRules]
    },
    plugins: [
        new HtmlWebpackPlug({ template: './src/index.html' })
    ]
}