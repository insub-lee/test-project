###### CheckboxGroup Component 설명 #####

# PROPS
CONFIG.property {
  defaultValue  : 실제 적용시 ColData로 변경예정
  returnType : StringNum, ArrayNum, StringValue, ArrayValue (4가지 리턴타입 아래 설명)
  checkboxData : 체크박스 렌더에 사용할 데이터 array(object) / array(String) / array(number)
  labelKey : array(object) 사용시, 라벨로 사용할 키값
  valueKey : array(object) 사용시, 벨류로 사용할 키값
}

# checkboxData
DataType :  array(object) / array(String) / array(number)

## checkboxData =  array(object) 사용시 labelKey, valueKey를 설정정하지 않을시 Retrun Data
StringNum : "0011" 
ArrayNum : ["0", "0", "1", "1"]
StringValue : "벨류3,벨류4"         <=  StringValue : object.keys()의 0번째 키값을 벨류/라벨키로 사용
ArrayValue : ["벨류3", "벨류4"]  <=  ArrayValue : object.keys()의 0번째 키값을 벨류/라벨키로 사용


# ReturnType (4 종류)
StringNum : "0011" 
ArrayNum : ["0", "0", "1", "1"]
StringValue : "벨류3,벨류4"
ArrayValue : ["벨류3", "벨류4"]


