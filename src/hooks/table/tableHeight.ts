import { ref, watch, onMounted } from "vue";

/** ElementPlus表格高度自适应 */
export function useTableHeight() {
  // 数据表格高度
  const tableHeight = ref();
  // 屏幕高度
  const screenHeight = ref(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
  // 屏幕宽度
  const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  /** 工具栏 */
  const showSearch = ref<boolean>(true); // 默认显示搜索条件
  const subheight = 248;
  const showSearchHeight = ref();
  const hiddenSearchHeight = ref();
  // 搜索表单高度
  const searchFormHeight = ref();
  const handleSearchFormHeight = () => {
    screenHeight.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const searchFormElement: any = document.getElementById("searchFormId");
    searchFormHeight.value = searchFormElement?.offsetHeight; // 搜索条件表单的高度
    showSearchHeight.value = screenHeight.value - (subheight + searchFormHeight.value);
    hiddenSearchHeight.value = screenHeight.value - subheight;
    // console.log("搜索条件表单的高度",searchFormHeight.value);
    // console.log("浏览器高度",screenHeight.value);
    // console.log("显示搜索表单高度",showSearchHeight.value);
    // console.log("隐藏搜索表单高度",hiddenSearchHeight.value);
    if (screenWidth.value <= 666) {
      // 手机端进行适应是，隐藏tabs所以需要加上50高度。
      showSearchHeight.value = screenHeight.value - (subheight + searchFormHeight.value) + 40;
      hiddenSearchHeight.value = screenHeight.value - subheight + 40;
    }
  };

  // 获取数据表格数据
  onMounted(() => {
    handleSearchFormHeight();
    tableHeight.value = showSearchHeight.value;
  });
  // 监听浏览器宽度变化，分配表格高度
  window.onresize = function () {
    handleSearchFormHeight();
    if (!showSearch.value) {
      tableHeight.value = hiddenSearchHeight.value;
    } else {
      tableHeight.value = showSearchHeight.value;
    }
  };
  watch(
    () => showSearch.value,
    () => {
      if (showSearch.value) {
        // alert("0")
        tableHeight.value = showSearchHeight.value;
      } else {
        // alert("1")
        handleSearchFormHeight();
        tableHeight.value = hiddenSearchHeight.value;
      }
    }
  );
  return {
    tableHeight,
    showSearch
  };
}

// ElementPlus表格高度自适应
// <el-form v-show="showSearch" id="searchFormId">
// import { useTableHeight } from '@/hooks/table/tableHeight';
// const { tableHeight, showSearch } = useTableHeight();

/** ElementPlus表格高度自适应 */
export function useTreeHeight() {
  // 数据表格高度
  const tableHeight = ref();
  // 屏幕高度
  const screenHeight = ref(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
  // 屏幕宽度
  const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  /** 工具栏 */
  const showSearch = ref<boolean>(true); // 默认显示搜索条件
  const subheight = 202;
  const showSearchHeight = ref();
  const hiddenSearchHeight = ref();
  // 搜索表单高度
  const searchFormHeight = ref();
  const handleSearchFormHeight = () => {
    screenHeight.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const searchFormElement: any = document.getElementById("searchFormId");
    searchFormHeight.value = searchFormElement?.offsetHeight; // 搜索条件表单的高度
    showSearchHeight.value = screenHeight.value - (subheight + searchFormHeight.value);
    hiddenSearchHeight.value = screenHeight.value - subheight;
    // console.log("搜索条件表单的高度",searchFormHeight.value);
    // console.log("浏览器高度",screenHeight.value);
    // console.log("显示搜索表单高度",showSearchHeight.value);
    // console.log("隐藏搜索表单高度",hiddenSearchHeight.value);
    if (screenWidth.value <= 666) {
      // 手机端进行适应是，隐藏tabs所以需要加上50高度。
      showSearchHeight.value = screenHeight.value - (subheight + searchFormHeight.value) + 40;
      hiddenSearchHeight.value = screenHeight.value - subheight + 40;
    }
  };

  // 获取数据表格数据
  onMounted(() => {
    handleSearchFormHeight();
    tableHeight.value = showSearchHeight.value;
  });
  // 监听浏览器宽度变化，分配表格高度
  window.onresize = function () {
    handleSearchFormHeight();
    if (!showSearch.value) {
      tableHeight.value = hiddenSearchHeight.value;
    } else {
      tableHeight.value = showSearchHeight.value;
    }
  };
  watch(
    () => showSearch.value,
    () => {
      if (showSearch.value) {
        // alert("0")
        tableHeight.value = showSearchHeight.value;
      } else {
        // alert("1")
        handleSearchFormHeight();
        tableHeight.value = hiddenSearchHeight.value;
      }
    }
  );
  return {
    tableHeight,
    showSearch
  };
}

/** 高度自适应[带分页器高度] */
export function usePrimaryHeight() {
  // 屏幕高度
  const screenHeight = ref(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
  // 屏幕宽度
  const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  const subheight = 160;
  const primaryHeight = ref();
  const handlePrimaryHeight = () => {
    screenHeight.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // console.log("搜索条件表单的高度",searchFormHeight.value);
    // console.log("浏览器高度",screenHeight.value);
    if (screenWidth.value <= 666) {
      // 手机端进行适应是，隐藏tabs所以需要加上50高度。
      primaryHeight.value = screenHeight.value - subheight + 40;
    } else {
      primaryHeight.value = screenHeight.value - subheight;
    }
  };

  // 获取数据表格数据
  onMounted(() => {
    handlePrimaryHeight();
    primaryHeight.value = screenHeight.value - subheight;
  });
  // 监听浏览器宽度变化，分配表格高度
  window.onresize = function () {
    handlePrimaryHeight();
  };
  return {
    primaryHeight
  };
}

/** 初始高度自适应[不带分页器高度，也就是页面内嵌iframe高度] -*/
export function usePageHeight() {
  // 屏幕高度
  const screenHeight = ref(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
  // 屏幕宽度
  const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  const subheight = 112;
  const pageHeight = ref();
  const handlePageHeight = () => {
    screenHeight.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // console.log("搜索条件表单的高度",searchFormHeight.value);
    // console.log("浏览器高度",screenHeight.value);
    if (screenWidth.value <= 666) {
      // 手机端进行适应是，隐藏tabs所以需要加上50高度。
      pageHeight.value = screenHeight.value - subheight + 40;
    } else {
      pageHeight.value = screenHeight.value - subheight;
    }
  };

  // 获取数据表格数据
  onMounted(() => {
    handlePageHeight();
    pageHeight.value = screenHeight.value - subheight;
  });
  // 监听浏览器宽度变化，分配表格高度
  window.onresize = function () {
    handlePageHeight();
  };
  return {
    pageHeight
  };
}
