import { apiClient } from "./apiClient";
import { apiRoutes } from "./constants";

const {VITE_BASE_URL} = import.meta.env

const api = apiClient.injectEndpoints({
    endpoints: (builder: any) => ({

        login:builder.mutation({
            query: (data: any)=>({
                url: `${VITE_BASE_URL}/${apiRoutes.login}`,
                method: "POST",
                body: data
            }),
        }),

        getHero:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.hero}`
            }),
        }),

        addHeroDetails:builder.mutation({
            query: (data: any)=>({
                url: `${VITE_BASE_URL}/${apiRoutes.hero}`,
                method: "POST",
                body: data
            }),
        }),

        getAbout:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.about}`
            }),
        }),


    })
});

export const {
    useLoginMutation,
    useGetHeroQuery,
    useAddHeroDetailsMutation,
    useGetAboutQuery,
} = api