export const froalaEditorConfig = {
  placeholder: 'Edit Me',
  charCounterCount: true,
  imageUploadURL: 'http://192.168.0.35:12082/upload',
  events: {
    'image.loaded': img => {
      img.each((index, el) => {
        const node = el;
        if (!(node.className.indexOf('img_replaced') > -1)) {
          node.src = node.src.replace('200x200', '0x0');
          // add .img_replaced after replace img link
          node.classList.add('img_replaced');
        }
      });
    },
  },
};
