import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export interface Response<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const api = {
  async fetchData<T>(url: string, config?: RequestInit): Promise<Response<T>> {
    const response = await fetch(url, {
      ...config,
      headers: {
        ...config?.headers,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP!: ${response.status}`);
    }

    return {
      success: true,
      data: await response.json(),
    };
  },

  async getContacts(): Promise<Response<ContactDto[]>> {
    return this.fetchData(
      "https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json"
    );
  },

  async getGroups(): Promise<Response<GroupContactsDto[]>> {
    return this.fetchData(
      "https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json"
    );
  },
};
