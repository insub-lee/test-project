export const froalaEditorConfig = () => ({
  placeholderText: '',
  width: '100%',
  charCounterCount: false,
  language: 'ko',
  imageUploadRemoteUrls: false,
  imageDefaultWidth: 'auto',
  imageUpload: true,
  pasteImage: true,
  toolbarButtons: [
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'subscript',
    'superscript',
    '|',
    'fontSize',
    'fontFamily',
    'paragraphFormat',
    'color',
    'insertImage',
    '-',
    'align',
    'formatOL',
    'formatUL',
    'indent',
    'outdent',
    'lineBreaker',
    '|',
    'undo',
    'redo',
  ],
  fontSize: [10, 11, 12, 14, 16, 20, 24, 30, 36, 42, 48, 54, 60, 72, 86, 100],
  fontFamily: {
    'Nanum Gothic': '나눔고딕',
    '맑은고딕,Malgun Gothic': '맑은고딕',
    '돋움,Dotum': '돋움',
    'Roboto,sans-serif': 'Roboto',
    'Oswald,sans-serif': 'Oswald',
    'Montserrat,sans-serif': 'Montserrat',
    'sans-serif': 'Open Sans Condensed',
  },
  fontFamilySelection: true,
  pluginsEnabled: [
    'align',
    'charCounter',
    'colors',
    'draggable',
    'entities',
    'fontAwesome',
    'fontFamily',
    'fontSize',
    'inlineStyle',
    'inlineClass',
    'lineBreaker',
    'lineHeight',
    'link',
    'lists',
    'paragraphFormat',
    'paragraphStyle',
    'quickInsert',
    'quote',
    'save',
    'image',
    'imageManager',
  ],
  toolbarSticky: false,
});

// export const froalaEditorConfig = () => ({
//   placeholder: 'Edit Me',
//   charCounterCount: true,
//   imageUploadURL: 'http://192.168.0.35:12082/upload',
//   events: {
//     'image.loaded': img => {
//       img.each((index, el) => {
//         const node = el;
//         if (!(node.className.indexOf('img_replaced') > -1)) {
//           const src = node.src.replace('200x200', '0x0');
//           const url = new URL(src);
//           const { pathname } = url;
//           node.src = pathname;
//           // add .img_replaced after replace img link
//           node.classList.add('img_replaced');
//         }
//       });
//     },
//   },
// });
