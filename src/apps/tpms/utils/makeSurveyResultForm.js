/**
 *
 * @param formJson - 화면에 그릴 아이템들에 대한 리스트
 * @param content - Json으로 구성된 뷰에 대한 정보
 * @param isReadOnly - 읽기전용
 * @returns {[]}
 */
export default (formJson = [], content = {}, isReadOnly = true) =>
  formJson.map((item, index) => {
    const itemValues = content.filter(answer => answer.sno === index + 1);
    if (item.type === 'essay') {
      return {
        ...item,
        option: {
          ...item.option,
          value: itemValues.length > 0 ? itemValues[0].answer : '',
          readOnly: isReadOnly,
        },
      };
    }
    return {
      ...item,
      option: {
        ...item.option,
        values: item.option.values.map((value, vIndex) => ({
          ...value,
          checked: itemValues.some(obj => obj.qno === vIndex + 1),
          readOnly: isReadOnly,
        })),
      },
    };
  });
