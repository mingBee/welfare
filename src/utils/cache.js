/**  
 * 缓存数据优化  
 * import cache from '@/common/js/cache'  
 * 使用方法 【  
 *     一、设置缓存  
 *         string    cache.put('k', 'string你好啊');  
 *         json      cache.put('k', { "b": "3" }, 2);  
 *         array     cache.put('k', [1, 2, 3]);  
 *         boolean   cache.put('k', true);  
 *     二、读取缓存  
 *         默认值    cache.get('k')  
 *         string    cache.get('k', '你好')  
 *         json      cache.get('k', { "a": "1" })  
 *     三、移除/清理    
 *         移除: cache.remove('k');  
 *         清理：cache.clear();   
 * 
 * @type {String}  
 */  
const postfix = '_donation'; // 缓存前缀   
/**  
 * 设置缓存   
 * @param  {[type]} k [键名]  
 * @param  {[type]} v [键值]  
 * @param  {[type]} t [时间、单位秒]  
 */ 
// const localStorage = window.localStorage;

function put(k, v, t) {  
  console.log('开始保存')
  localStorage.setItem(k, v)   
  console.log('保存成功')
  let seconds = parseInt(t);  
  if (seconds > 0) {  
      let timestamp = Date.parse(new Date());  
      timestamp = timestamp / 1000 + seconds;  
      localStorage.setItem(k + postfix, timestamp + "")  
  } else {  
    localStorage.removeItem(k + postfix)
  }  
}  

/**  
 * 获取缓存   
 * @param  {[type]} k   [键名]  
 * @param  {[type]} def [获取为空时默认]  
 */  
function get(k, def) {  
    let deadtime = parseInt(localStorage.getItem(k + postfix))   
    if (deadtime) {  
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
					removeAsync(k);  //缓存过期，清除缓存
					if (def) {  
							return def;  
					} else {  
							return false;  
					}  
        }  
    }  
    let res = localStorage.getItem(k);  
    if (res) {  
        return res;  
    } else {  
        if (def == undefined  || def == "") {  
            def = false;   
        }  
        return def;  
    }  
}  

function removeAsync(k) {  
  localStorage.removeItem(k);  
  localStorage.removeItem(k + postfix);  
}  

export default {
	put,
	get
}
