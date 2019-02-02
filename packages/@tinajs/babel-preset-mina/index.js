module.exports = () => ({
  presets: [
    [require('@babel/preset-env'), {
      modules: false,
      loose: true,
    }],
  ],
  plugins: [
    [require('@babel/plugin-transform-runtime'), {
      corejs: 2,
    }],
    require('@babel/plugin-proposal-class-properties'),
    require('@babel/plugin-proposal-export-default-from'),
  ]
})
