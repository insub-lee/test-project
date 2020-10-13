/**
 *
 * @param formJson - 화면에 그릴 아이템들에 대한 리스트
 * @param content - Json으로 구성된 뷰에 대한 정보
 * @returns {[]}
 */
export default (formJson = [], content = {}) =>
  formJson
    .filter(item => {
      if (item.type === 'uploader') {
        return content[`${item.option.name}_FILE_PATH`] !== undefined && content[`${item.option.name}_FILE`] !== undefined;
      }
      return content[item.option.name] !== undefined;
    })
    .map(item => {
      if (item.type === 'uploader') {
        const { name } = item.option;
        const filePaths = content[`${name}_FILE_PATH`].split(':::');
        const filenames = content[`${name}_FILE`].split(':::');
        if (filePaths[0] === '') {
          return {
            ...item,
            option: {
              ...item.option,
              files: [],
              readOnly: true,
            },
          };
        }
        const files = filePaths.map((path, index) => ({
          id: index,
          link: path,
          name: filenames[index] || 'unknown',
        }));
        return {
          ...item,
          option: {
            ...item.option,
            files,
            readOnly: true,
          },
        };
      }
      if (item.type === 'select') {
        return {
          ...item,
          option: {
            ...item.option,
            value: content[item.option.name],
            values: item.option.values.map(valueItem => ({
              ...valueItem,
              selected: valueItem.value === content[item.option.name],
            })),
            readOnly: true,
          },
        };
      }
      return {
        ...item,
        option: {
          ...item.option,
          value: content[item.option.name],
          readOnly: true,
        },
      };
    });
