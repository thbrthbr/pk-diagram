const DataShow = () => {
  const imageContext = require.context(
    '../Default',
    false,
    /\.(jpg|jpeg|png|webp)$/,
  );
  const categoryData = imageContext.keys().map(imageContext);
  console.log(imageContext.keys());
  return <></>;
};

export { DataShow };
