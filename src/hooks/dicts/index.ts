import { reactive, onMounted } from 'vue'
import { listDataByType } from "@/api/system/dict/data/index.ts";

export function useKoiDict(dictType: Array<string>) {
  let koiDicts: any = reactive({})
  onMounted(async () => {
    for (const type of dictType) {
      const res: any = await listDataByType(type);
      koiDicts[type] = res.data;
    }
  })
  return { koiDicts }
}
