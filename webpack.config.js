module.exports = {
  resolve: {
    fallback: {
      'xhr2-cookies': require.resolve('xhr2-cookies'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      stream: require.resolve('stream-browserify'),
    },
  },
}
