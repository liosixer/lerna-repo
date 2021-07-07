import Vue from "vue";

//只能输入两位小数
const enterNumberPoint2 = Vue.directive('enterNumberPoint2', {
    inserted: function (el) {
      let trigger = (el, type) => {
        const e = document.createEvent('HTMLEvents')
        e.initEvent(type, true, true);
        el.dispatchEvent(e);
      }
  
      el.addEventListener("keyup", function (e) {
        let input = e.target;
        let reg = new RegExp('^((?:(?:[1-9]{1}\\d*)|(?:[0]{1}))(?:\\.(?:\\d){0,2})?)(?:\\d*)?$'); //正则验证是否是数字(小数整数均可)
        let matchRes = input.value.match(reg);
        if (matchRes === null) {
          input.value = "";
        } else {
          //matchRes[0]是匹配的无限位的小数
          //matchRes[1]是小数点后两位前面符合的数值  
          //如输入12.223 matchRes[0]是12.223 matchRes[1]12.22 此时input值改为matchRes[1]的值即可
          if (matchRes[1] !== matchRes[0]) {
            input.value = matchRes[1];
          }
        }
        trigger(input, 'input');
      });
    }
  });

  export default { enterNumberPoint2 };