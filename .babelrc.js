module.exports = (api) => {
  const isDevelopment = api.env() !== 'production';

  return {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
        isDevelopment && require.resolve('react-refresh/babel'),
      ].filter(Boolean),
    ],
  };
};
