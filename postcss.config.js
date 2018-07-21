module.exports = {
    plugins: {
        'autoprefixer': {browsers: 'last 5 version'},
        'postcss-px-to-viewport': {
            viewportWidth: 380,
            viewportHeight: 331,
            unitPrecision: 6,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore'],
            minPixelValue: 1,
            mediaQuery: false
        },
        // 'postcss-pxtorem': {
        //     rootValue: 16,
        //     unitPrecision: 6,
        //     propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
        //     selectorBlackList: ['html'],
        //     replace: true,
        //     minPixelValue: 0,
        //     mediaQuery: false
        // }
    }
}