# 미완성된 컴포넌트.. 개선부분이 많이 필요


# PROPS INFO
  children: 인쇄될 COMPONENT,
  useFooter: 인쇄시 footer 영역 사용여부,
  footerType: default(공백), custom(유저Props), magnachip(로고), keyfoundry(로고)
  CusotmFooter: footer 영역에 넣을콘텐츠
  handleBeforePrint: 프린트 전에 이벤트가 필요한 경우 사용
  handleAfterPrint: 프린트 후에 이벤트가 필요한 경우 사용

# PROPS TYPES
  children: PropTypes.any,
  useFooter: PropTypes.bool,
  footerType: PropTypes.string,
  handleBeforePrint: PropTypes.func,
  handleAfterPrint: PropTypes.func,