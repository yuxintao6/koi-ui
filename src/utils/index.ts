/**
 * @description 生成唯一 uuid
 * @returns {String}
 */
export function generateUUID() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    let random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data: any, id?: any, parentId?: any, children?: any) {
  let config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children"
  };

  var childrenListMap: any = {};
  var nodeIds: any = {};
  var tree: any = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 把日期范围构造成 beginTime AND endTime
 * @param params 传递对象参数
 * @param dateRange 日期数组
 * @param propName1 自定义名称1
 * @param propName1 自定义名称2
 * @returns
 */
export function koiDatePicker(searchParams: object, dateRange: any, propName1?: string, propName2?: string) {
  searchParams = typeof searchParams === "object" && searchParams !== null && !Array.isArray(searchParams) ? searchParams : {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (propName1 != null && propName1 != "" && propName2 != null && propName2 != "") {
    // 创建一个空的对象
    const dataParams: any = {};
    dataParams[propName1] = dateRange[0];
    dataParams[propName2] = dateRange[1];
    return Object.assign({}, searchParams, dataParams);
  } else {
    const dataParams = {
      beginTime: dateRange[0],
      endTime: dateRange[1]
    };
    return Object.assign({}, searchParams, dataParams);
  }
}

/**
 * 回显数据字典，进行状态翻译(数组对象)
 * @param datas 当前状态数据列表
 * @param value 需要进行翻译的值
 * @returns
 */
export function selectDictLabel(datas: any, value: any) {
  if (value === undefined || value === null || value === "") {
    return "";
  }
  var actions = [];
  Object.keys(datas).map(key => {
    // 循环数据的获取key
    if (datas[key].dictValue === "" + value) {
      actions.push(datas[key].dictLabel);
      return true;
    }
  });
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join("");
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == 0 隐藏的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: any) {
  let newMenuList: any = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter((item: any) => {
    return item.isHide == "1" || item.meta?.isHide == "1";
  });
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export const getAllBreadcrumbList = (menuList: any, parent = [], result: { [key: string]: any } = {}) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];

    if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
  }
  return result;
};

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String}
 */
export function getUrlWithParams() {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search
  };
  // @ts-ignore
  return url[mode];
}

/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
  // @ts-ignore
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}
