const fs = require('fs')

// Busca un navegador basado en Chromium instalado (Chrome o Edge) y lo usa para las pruebas.
const POSIBLES_NAVEGADORES = [
    process.env.CHROME_BIN,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA &&
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]

const navegadorEncontrado = POSIBLES_NAVEGADORES.find((ruta) => ruta && fs.existsSync(ruta))
if (navegadorEncontrado) {
    process.env.CHROME_BIN = navegadorEncontrado
}

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'webpack'],

        files: [
            { pattern: 'src/tests/**/*.spec.jsx', watched: false },
            { pattern: 'src/tests/**/*.spec.js', watched: false },
        ],
        preprocessors: {
            'src/tests/**/*.spec.jsx': ['webpack'],
            'src/tests/**/*.spec.js': ['webpack'],
        },

        webpack: {
            mode: 'development',
            resolve: { extensions: ['.js', '.jsx'] },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { targets: { chrome: '100' } }],
                                    ['@babel/preset-react', { runtime: 'automatic' }],
                                ],
                            },
                        },
                    },
                ],
            },
        },

        browsers: ['ChromeHeadless'],
        reporters: ['progress'],
        singleRun: true,
        restartOnFileChange: false,
    })
}