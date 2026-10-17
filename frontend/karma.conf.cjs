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
    // `npm run test:coverage` agrega --cobertura: instrumenta el código y genera el informe.
    const conCobertura = Boolean(config.cobertura)

    config.set({
        basePath: '',
        frameworks: ['jasmine', 'webpack'],

        files: [{ pattern: 'src/tests/**/*.spec.jsx', watched: false }],
        preprocessors: {
            'src/tests/**/*.spec.jsx': ['webpack'],
        },

        webpack: {
            mode: 'development',
            resolve: { extensions: ['.js', '.jsx'] },
            module: {
                rules: [
                    {
                        // El proyecto declara "type": "module": sin esta regla webpack exige
                        // escribir la extensión en cada import de un archivo .js.
                        test: /\.m?js$/,
                        resolve: { fullySpecified: false },
                    },
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
                                // Solo mide el código de la aplicación, no las pruebas.
                                plugins: conCobertura
                                    ? [['istanbul', { exclude: ['src/tests/**', '**/node_modules/**'] }]]
                                    : [],
                            },
                        },
                    },
                ],
            },
        },

        browsers: ['ChromeHeadless'],
        reporters: conCobertura ? ['spec', 'coverage'] : ['spec'],

        coverageReporter: {
            dir: 'coverage',
            reporters: [
                { type: 'text-summary' },
                { type: 'text' },
                { type: 'html', subdir: 'html' },
            ],
        },

        singleRun: true,
        restartOnFileChange: false,
    })
}