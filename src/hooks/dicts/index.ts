import { reactive, onMounted } from "vue";
import { listDataByType } from "@/api/system/dict/data/index.ts";

export function useKoiDict(dictType: Array<string>) {
  let koiDicts: any = reactive({});
  onMounted(async () => {
    if (dictType.length > 0) {
      for (const type of dictType) {
        const res: any = await listDataByType(type);
        if (res.data != null) {
          koiDicts[type] = res.data;
        }
      }
    }
  });
  return { koiDicts };
}
