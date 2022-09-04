import React from 'react'

export const SortArray = (list) => {

    for (var i=0;i<list.length-1;i++){
        for (var j=0;j<list.length-i-1;j++){
            if(list[j].point>list[j+1].point){
                let tmp = list[j];
                list[j] = list[j+1];
                list[j+1] = tmp;
            }
        }
    }
  return (list)
}
