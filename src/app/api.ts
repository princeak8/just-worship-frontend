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

        getMemberById: builder.query({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.teamById}/${data}`
            }),
        }),

        addTeam:builder.mutation({
            query: (data: any) => ({
                url: `${VITE_BASE_URL}/${apiRoutes.team}`,
                method: 'POST',
                body: data,
            }),
        }),

        updateMember:builder.mutation({
            query: ({formdata, id}:{formdata: any, id: any}) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.teamById}/${id}`,
                method: "POST",
                body: formdata,
            }),
        }),

        deleteMember:builder.mutation({
            query: (id: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.teamById}/${id}`,
                method: "DELETE",
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
    useGetMemberByIdQuery,
    useAddTeamMutation,
    useUpdateMemberMutation,
    useDeleteMemberMutation,
    useGetContactQuery,
    useGetEventQuery,
    useGetUserQuery,
} = api