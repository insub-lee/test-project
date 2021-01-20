# Jasper Viewer ProtoType - JeongHyun


## props

### src(String) : Jasper Server REST API URL
```
  Jasper API sample url

  GET :: http://<host>:<port>/jasperserver[-pro]/rest_v2/reports/path/to/report.<format>?<arguments>

  props ex)
  getHtml : 192.168.191.110:4488/jasperserver-pro/rest_v2/reports/Dev/MDCS/BizDocReport.html?workSeq=${workSeq}&taskSeq=${taskSeq}&j_username=jasperadmin&j_password=jasperadmin
  getPdg  : 192.168.191.110:4488/jasperserver-pro/rest_v2/reports/Dev/MDCS/BizDocReport.pdf?workSeq=${workSeq}&taskSeq=${taskSeq}&j_username=jasperadmin&j_password=jasperadmin

```

### exportFormats(String) : Jasper Server Export Formats
```
  pdf, xls, CSV, DOCX, RTF, ODT, ODS, XLSX, PPTX :: 지원

  props ex) 'pdf,xls,PPTX'
```

### customContents(JSX element)