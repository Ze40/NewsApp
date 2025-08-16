module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'env-config',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
