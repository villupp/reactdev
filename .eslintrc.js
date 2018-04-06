module.exports = {
    'extends': 'standard',
    'plugins': ['react'],
    'parserOptions': {
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module'
    },
    'rules': {
        'no-debugger': [0],
        'camelcase': [0],
        'curly': [0],
        'indent': [0],
        'no-undef': [0],
        'quotes': [0],
        'eqeqeq': [1],
        'semi': [
            1, 'always'
        ],
        'no-tabs': [0],
        'spaced-comment': [0],
        'no-multiple-empty-lines': [1],
        'no-trailing-spaces': [1],
        'padded-blocks': [1],
        'no-unused-vars': [1],
        'no-redeclare': [1],
        'comma-dangle': [1],
        'brace-style': [0],
        'eol-last': [0],
        'keyword-spacing': [0],
        'no-mixed-spaces-and-tabs': [0],
        'no-mixed-operators': [1],
        'no-unmodified-loop-condition': [0],
        'no-use-before-define': [1],
        'space-before-function-paren': [0],
        'no-new-object': [1],
        'react/jsx-uses-vars': [1],
        'react/react-in-jsx-scope': [1]
    }
};