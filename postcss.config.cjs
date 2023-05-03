function charsetRemoval() {
    return {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
            charset: (atRule) => {
                if (atRule.name === 'charset')
                    atRule.remove()
            },
        },
    }
}

module.exports = () => {
    return {
        plugins: [charsetRemoval()],
    }
}
