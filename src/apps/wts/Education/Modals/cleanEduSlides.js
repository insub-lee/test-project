export const getSlideImageUrls = count => {
  const imageUrls = [];
  for (let i = 0; i < count; i += 1) {
    imageUrls.push({
      original: `/image/slides/슬라이드${i + 1}.JPG`,
      thumbnail: `/image/slides/슬라이드${i + 1}.JPG`,
    });
  }
  return imageUrls;
};
