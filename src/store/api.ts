import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fs.gcfiles.net/fileservice/file/download",
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getContacts: builder.query<ContactDto[], void>({
            query: () => "/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json",
            transformResponse: (response: any) => response as ContactDto[],
        }),

        getGroups: builder.query<GroupContactsDto[], void>({
            query: () => "/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json",
            transformResponse: (response: any) => response as GroupContactsDto[],
        }),
    }),
});

export const { useGetContactsQuery, useGetGroupsQuery } = api;
