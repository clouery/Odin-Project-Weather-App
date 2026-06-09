import path from "node:path";

export default {
    mode: "development",
    entry: "./src/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
        static: {
            directory: path.resolve(import.meta.dirname, "src"),
        },
        watchFiles: ["./src/index.html"],
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};