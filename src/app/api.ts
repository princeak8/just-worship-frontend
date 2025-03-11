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

        getHeroById:builder.query({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.hero}/${data}`
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

        getAboutById:builder.query({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.hero}/${data}`
            }),
        }),

        getTeam:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.team}`
            }),
        }),

        getContact:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.contact}`
            }),
        }),

        getEvent:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.event}`
            }),
        }),

        getUser:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.user}`
            }),
        }),
    })
});

export const {
    useLoginMutation,
    useGetHeroQuery,
    useGetHeroByIdQuery,
    useAddHeroDetailsMutation,
    useGetAboutQuery,
    useGetAboutByIdQuery,
    useGetTeamQuery,
    useGetContactQuery,
    useGetEventQuery,
    useGetUserQuery,
} = api