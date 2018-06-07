module.exports = () => ({

  plugins: [

    require('postcss-media-minmax')(),

    require('postcss-selector-not')(),

    require('postcss-flexbugs-fixes')(),

    require('autoprefixer')({
      browsers: ['last 10 versions','Firefox >= 20','Android >= 4.0','iOS >= 8']
    })
  ]
})
