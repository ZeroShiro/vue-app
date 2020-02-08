module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'component',
      {
        libraryName: 'mint-ui',
        style: true
      }
    ]
  ]
};

// module.exports = {
//   presets: ['@vue/cli-plugin-babel/preset']
//   // plugins: [
//   //   'component',
//   //   [
//   //     {
//   //       libraryName: 'mint-ui',
//   //       style: true
//   //     }
//   //   ]
//   // ]
// };
