
//简单数据变成父子结构数据  忽略大小写
function simpleToPS(data,optObj){
    let opts = {
      idKey: "id",
      pIdKey: "pid",
      rootPId: ""
    }
    opts = Object.assign({},opts,optObj);
    for(let i in opts){
      opts[i] = opts[i].toLowerCase();
    }
    data = JSON.parse(JSON.stringify(data));
    for(let i in data){
        data[i].children = [];
      }
    let index = 0,result=[];
    while(data.length>0){
      index = index%data.length;
      if(data[index][opts.pIdKey]==opts.rootPId){
        data[index].level=1;
        result.push(data[index]);
        data.splice(index,1);
        index--;
      }else{
        arrpush(result,2);
      }
      index++;
    }
    function arrpush(arr,level){
        let markinto=true;
        for(let i=0;i<data.length;i++){
          for(let k=0;k<arr.length;k++){
            if(data.length>0){
              if(arr[k][opts.idKey]==data[i][opts.pIdKey]){
                data[i].level = level;
                arr[k].children.push(data[i]);
                data.splice(i,1);
                i--;
                markinto = false;
                break;
              }
            }
            if(arr[k].children.length>0&&markinto){
              arrpush(arr[k].children,++level);
              level--;
            }
          }
        }
        
      }
      return result;
   }


   //console.log(simpleToPS([{id:1,pid:"",}]));
//外层循环数组，每层对item做加工  map作为取值返回   整体思想先找到父在赋值子
   function convert(list) {
    const res = []
    const map = list.reduce((res, v) => (res[v.id] = v, res), {});
    console.log(map);
    for (const item of list) {
        if (item.parentId === 0) {
            res.push(item)
            continue
        }
        if (item.parentId in map) {
          //在map中找出父
            const parent = map[item.parentId]
            console.log(parent);
            //添加子
            parent.children = parent.children || []
            parent.children.push(item)
        }
    }
    return res
}

let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
console.log(JSON.stringify(convert(list),null,2));
//convert(list);