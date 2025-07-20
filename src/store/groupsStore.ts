import { makeAutoObservable } from "mobx";
import { api, Response } from "./api/api";
import { isSuccessResponse } from "src/utils/isSuccessResponse";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const groupsStore = makeAutoObservable({
  items: [] as GroupContactsDto[],
  loading: false,
  error: null as string | null,

  *fetch() {
    try {
      groupsStore.loading = true;
      groupsStore.error = null;

      const result: Response<GroupContactsDto[]> = yield api.getGroups();

      if (isSuccessResponse(result)) {
        groupsStore.items = result.data;
      } else {
        groupsStore.error = result.error || "Не удалось загрузить группы";
      }
    } catch (error) {
      groupsStore.error =
        error instanceof Error ? error.message : "Неизвестная ошибка";
    } finally {
      groupsStore.loading = false;
    }
  },
});
