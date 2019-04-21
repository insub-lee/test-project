export function CommonParam2(P1,P2){
    let Param = [];

    P1.map(p1 => Param.push({value:p1.CM_CODE,label:p1.CD_NM,children:[]}));
    
    for(let i=0; i < Param.length ; i++) {
      for(let j=0; j< P2.length; j++){
        if (Param[i].value==P2[j].PARENT_CODE){
            Param[i].children.push({value:P2[j].CM_CODE,label:P2[j].CD_NM});
        }
      }
    }   

    return Param;
}

export function CommonParam3(P1,P2,P3){
    let Param = [];

    P1.map(p1 => Param.push({value:p1.CM_CODE,label:p1.CD_NM,children:[]}));
    
    for(let i=0; i < Param.length ; i++) {
      for(let j=0; j< P2.length; j++){
        if (Param[i].value==P2[j].PARENT_CODE){
            Param[i].children.push({value:P2[j].CM_CODE,label:P2[j].CD_NM,children:[]});
        }
      }
    }   
    
    for(let i=0; i < Param.length ; i++) {
        for(let j=0; j< Param[i].children.length; j++){
          for(let k=0; k< P3.length; k++){
            if (Param[i].children[j].value==P3[k].PARENT_CODE){
                Param[i].children[j].children.push({value:P3[k].CM_CODE,label:P3[k].CD_NM});
            }
          }
        }
    }

    return Param;
}

export function CommonParamAllFloor(P1,P2,P3){
  let Param = [];

  P1.map(p1 => Param.push({value:p1.CM_CODE,label:p1.CD_NM,children:[]}));
  
  for(let i=0; i < Param.length ; i++) {
    for(let j=0; j< P2.length; j++){
      if (Param[i].value==P2[j].PARENT_CODE){
          Param[i].children.push({value:P2[j].CM_CODE,label:P2[j].CD_NM,children:[]});
      }
    }
  }   
  
  for(let i=0; i < Param.length ; i++) {
      for(let j=0; j< Param[i].children.length; j++){
        for(let k=0; k< P3.length; k++){
          if (Param[i].children[j].value==P3[k].PARENT_CODE){
              if(Param[i].children[j].children.length===0) {
                Param[i].children[j].children.push({value:'',label:'전체'});
              }
              Param[i].children[j].children.push({value:P3[k].CM_CODE,label:P3[k].CD_NM});
          }
        }
      }
  }

  return Param;
}

export function CommonParam4(P1,P2,P3,P4){
    let Param = [];

    P1.map(p1 => Param.push({value:p1.CM_CODE,label:p1.CD_NM,children:[]}));
     
    for(let i=0; i < Param.length ; i++) {
      for(let j=0; j< P2.length; j++){
        if (Param[i].value==P2[j].PARENT_CODE){
            Param[i].children.push({value:P2[j].CM_CODE,label:P2[j].CD_NM,children:[]});
        }
      }
    }   
    
    for(let i=0; i < Param.length ; i++) {
        for(let j=0; j< Param[i].children.length; j++){
          for(let k=0; k< P3.length; k++){
            if (Param[i].children[j].value==P3[k].PARENT_CODE){
                Param[i].children[j].children.push({value:P3[k].CM_CODE,label:P3[k].CD_NM,children:[]});
            }
          }
        }
    }

    for(let i=0; i < Param.length ; i++) {
        for(let j=0; j< Param[i].children.length; j++){
          for(let k=0; k< Param[i].children[j].children.length; k++){
            for(let l=0; l< P4.length; l++ ){
              if (Param[i].children[j].value==P4[l].PARENT_CODE){
                    Param[i].children[j].children[k].children.push({value:P4[l].CM_CODE,label:P4[l].CD_NM});
              }
            }
          }
        }
    }

    return Param;
}

export function CommonParamMeetRoom(P1,P2,P3,P4){
    let Param = [];

    P1.map(p1 => Param.push({value:p1.CM_CODE,label:p1.CD_NM,children:[]}));     
    
    for(let i=0; i < Param.length ; i++) {
      for(let j=0; j< P2.length; j++){
        if (Param[i].value==P2[j].PARENT_CODE){
            Param[i].children.push({value:P2[j].CM_CODE,label:P2[j].CD_NM,children:[]});
        }
      }
    }   
    
    for(let i=0; i < Param.length ; i++) {
        for(let j=0; j< Param[i].children.length; j++){
          for(let k=0; k< P3.length; k++){
            if (Param[i].children[j].value==P3[k].PARENT_CODE){
                Param[i].children[j].children.push({value:P3[k].CM_CODE,label:P3[k].CD_NM,children:[]});
            }
          }
        }
    }

    for(let i=0; i < Param.length ; i++) {
        for(let j=0; j< Param[i].children.length; j++){
          //if (Param[i].children[j].value!=''){      ------------  조회조건에 '전체(value='') 항목을 포함시켰을 때 사용'
            for(let k=0; k< Param[i].children[j].children.length; k++){
              for(let l=0; l< P4.length; l++ ){
                if (Param[i].children[j].value==P4[l].BLDNG_ID && 
                  Param[i].children[j].children[k].value==P4[l].FLOR_LOC ){
                    Param[i].children[j].children[k].children.push({value:P4[l].MR_REG_NO,label:P4[l].MR_NM});
                }
              }
            }
          //}
        }
    }


    return Param;
}


export function CommonParamMeetRoomGbn(P1,P2,P3,P4){
  let Param = [];

  P1.map(p1 => Param.push({value:p1.CM_CODE,label:p1.CD_NM,children:[]}));     
  
  for(let i=0; i < Param.length ; i++) {
    for(let j=0; j< P2.length; j++){
      if (Param[i].value==P2[j].PARENT_CODE){
          Param[i].children.push({value:P2[j].CM_CODE,label:P2[j].CD_NM,children:[]});
      }
    }
  }   
  
  for(let i=0; i < Param.length ; i++) {
      for(let j=0; j< Param[i].children.length; j++){
        for(let k=0; k< P3.length; k++){
          if (Param[i].children[j].value==P3[k].PARENT_CODE){
              Param[i].children[j].children.push({value:P3[k].CM_CODE,label:P3[k].CD_NM,children:[{value:"C",label:"접견실",children:[]},{value:"M",label:"회의실",children:[]}]});
          }
        }
      }
  }

  for(let i=0; i < Param.length ; i++) {
      for(let j=0; j< Param[i].children.length; j++){
        //if (Param[i].children[j].value!=''){      ------------  조회조건에 '전체(value='') 항목을 포함시켰을 때 사용'
          for(let k=0; k< Param[i].children[j].children.length; k++){
            for(let l=0; l< Param[i].children[j].children[k].children.length; l++){
              for(let m=0; m< P4.length; m++ ){
                if (Param[i].children[j].value==P4[m].BLDNG_ID && 
                  Param[i].children[j].children[k].value==P4[m].FLOR_LOC &&
                  Param[i].children[j].children[k].children[l].value==P4[m].MR_GBN  ){
                    Param[i].children[j].children[k].children[l].children.push({value:P4[m].MR_REG_NO,label:P4[m].MR_NM});
                }
              }
          }
          }
        //}
      }
  }


  return Param;
}