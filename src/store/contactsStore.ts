import { makeAutoObservable } from "mobx";
import { ContactDto } from "src/types/dto/ContactDto";
import { api, Response } from "./api/api";
import { isSuccessResponse } from "src/utils/isSuccessResponse";

export const contactsStore = makeAutoObservable({
  items: [] as ContactDto[],
  loading: false,
  error: null as string | null,

  *fetch() {
    try {
      contactsStore.loading = true;
      contactsStore.error = null;

      const result: Response<ContactDto[]> = yield api.getContacts();

      if (isSuccessResponse(result)) {
        contactsStore.items = result.data;
      } else {
        contactsStore.error = result.error || "Не удалось загрузить контакты";
      }
    } catch (error) {
      contactsStore.error =
        error instanceof Error ? error.message : "Неизвестная ошибка";
    } finally {
      contactsStore.loading = false;
    }
  },
});
