export const froalaEditorConfig = {
  placeholder: 'Edit Me',
  width: '100%',
  // height: 300,
  charCounterCount: false,
  language: 'ko',
  imageUploadRemoteUrls: false,
  imageDefaultWidth: 'auto',
  imageUpload: true,
  pasteImage: true,
  toolbarSticky: true,
  scrollableContainer: '.manualMainContentWrapper',
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
    'insertTable',
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
    'table',
    'toolbarSticky',
  ],
  toolbarBottom: true,
  fontFamilySelection: true,
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
