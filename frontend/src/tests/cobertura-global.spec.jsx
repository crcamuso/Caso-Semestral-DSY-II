/* global require */
// No contiene pruebas: carga los módulos de la aplicación para que el informe de cobertura
// incluya también los que ninguna prueba usa (aparecen con 0%).
const carpetas = [
    require.context('../components', true, /\.jsx?$/),
    require.context('../context', true, /\.jsx?$/),
    require.context('../hooks', true, /\.jsx?$/),
    require.context('../services', true, /\.jsx?$/),
    require.context('../utils', true, /\.jsx?$/),
]

carpetas.forEach((carpeta) => carpeta.keys().forEach(carpeta))