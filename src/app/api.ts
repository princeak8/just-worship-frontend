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

        updateHeroDetails:builder.mutation({
            query: ({formdata, id} : {formdata: any, id: any}) => ({
                url: `${VITE_BASE_URL}/${apiRoutes.hero}/${id}`,
                method: "POST",
                body: formdata,
            }),
        }),

        deleteHeroDetails:builder.mutation({
            query: (id: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.hero}/${id}`,
                method: "DELETE",
            }),
        }),

        getAbout:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.about}`
            }),
        }),

        getAboutById:builder.query({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.about}/${data}`
            }),
        }),
        updateAbout:builder.mutation({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.about}`,
                method: 'POST',
                body: data,
            }),
        }),

        getYoutube:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.youtube}`
            }),
        }),

          updateYoutube:builder.mutation({
            query: (data: any)=>({
                url: `${VITE_BASE_URL}/${apiRoutes.youtube}`,
                method: "POST",
                body: data
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

        getStock:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.store}`
            }),
        }),

        getStockById: builder.query({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.store}/${data}`
            }),
        }),

        addStock:builder.mutation({
            query: (data: any) => ({
                url: `${VITE_BASE_URL}/${apiRoutes.store}`,
                method: 'POST',
                body: data,
            }),
        }),

        updateStock:builder.mutation({
            query: ({formdata, id}:{formdata: any, id: any}) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.store}/${id}`,
                method: "POST",
                body: formdata,
            }),
        }),

        deleteStock:builder.mutation({
            query: (id: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.store}/${id}`,
                method: "DELETE",
            }),
        }),

        getEvent:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.event}`
            }),
        }),

        getEventById: builder.query({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.event}/${data}`
            }),
        }),

        addEvent:builder.mutation({
            query: (data: any) => ({
                url: `${VITE_BASE_URL}/${apiRoutes.event}`,
                method: 'POST',
                body: data,
            }),
        }),

        updateEvent:builder.mutation({
            query: ({formdata, id}:{formdata: any, id: any}) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.event}/${id}`,
                method: "POST",
                body: formdata,
            }),
        }),

        deleteEvent:builder.mutation({
            query: (id: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.event}/${id}`,
                method: "DELETE",
            }),
        }),
        
        getContact:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.contact}`
            }),
        }),

        updateContact:builder.mutation({
            query: (data: any) => ({
                url: `${VITE_BASE_URL}/${apiRoutes.contact}`,
                method: "POST",
                body: data,
            }),
        }),

        getGiving:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.giving}`
            }),
        }),


        getOptions:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.givingOptions}`
            }),
        }),

        editGivingOption:builder.mutation({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.editgivingOptions}`,
                method: 'POST',
                body: data
            }),
        }),

        getGallery:builder.query({
            query: ({perPage}: {perPage: number}) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.gallery}?perPage=${perPage}&&page=${1}`
            }),
        }),

        getGallerytById: builder.query({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.gallery}/${data}`
            }),
        }),

        addGalleryImage:builder.mutation({
            query: (data: any) => ({
                url: `${VITE_BASE_URL}/${apiRoutes.addGallery}`,
                method: 'POST',
                body: data,
            }),
        }),

        updateGalleryImage:builder.mutation({
            query: ({formdata, id}:{formdata: any, id: any}) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.updateGallery}/${id}`,
                method: "POST",
                body: formdata,
            }),
        }),

        deleteGalleryImage:builder.mutation({
            query: (id: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.deleteGallery}/${id}`,
                method: "DELETE",
            }),
        }),


        getSubscribers:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.subscribers}`
            }),
        }),

        getMembers:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.members}`
            }),
        }),
        

        getUser:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.user}`
            }),
        }),

        getAccount:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.accounts}`
            }),
        }),

        createAccount:builder.mutation({
            query: (data: any) => ({
                url: `${VITE_BASE_URL}/${apiRoutes.accounts}`,
                method: 'POST',
                body: data,
            }),
        }),

        editAccount:builder.mutation({
            query: ({formdata, id}: {formdata: any , id:number}) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.accounts}/${id}`,
                method: 'POST',
                body: formdata,
            }),
        }),

        deleteAccount:builder.mutation({
            query: (id: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.accounts}/${id}`,
                method: "DELETE",
            }),
        }),

        getLive:builder.query({
            query: (url: any) =>({
                url:    `${VITE_BASE_URL}/${apiRoutes.live}`
            })
        }),

        getLiveById:builder.query({
            query: (data: any) =>({
                url:    `${VITE_BASE_URL}/${apiRoutes.live}/${data}`
            })
        }),

        addLive:builder.mutation({
            query: (data: any) =>({
                url:    `${VITE_BASE_URL}/${apiRoutes.live}`,
                method: 'POST',
                body: data,
            })
        }),

        editLive:builder.mutation({
            query: ({formdata, id}: {formdata: any , id:number}) =>({
                url:    `${VITE_BASE_URL}/${apiRoutes.live}/${id}`,
                method: 'POST',
                body: formdata,
            })
        }),

        deleteLive:builder.mutation({
            query: (id: any) =>({
                url:    `${VITE_BASE_URL}/${apiRoutes.live}/${id}`,
                method: 'DELETE',
            })
        }),

        onlineAccount:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.onlineAccount}`
            })
        }),

        createOnlineAccount:builder.mutation({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.onlineAccount}`,
                method: 'POST',
                body: data,
            })
        }),

        editOnlineAccount:builder.mutation({
            query: ({formdata, id}: {formdata: any , id:number}) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.onlineAccount}/${id}`,
                method: 'POST',
                body: formdata,
            })
        }),

        deleteOnlineAccount:builder.mutation({
            query: (id: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.onlineAccount}/${id}`,
                method: "DELETE",
            }),
        }),

        banks:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.banks}`
            })
        }),

        countries:builder.query({
            query: (url: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.countries}`
            })
        }),

        contact_message:builder.mutation({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.contact_message}`,
                method: 'POST',
                body: data
            }),
        }),

        subscribe:builder.mutation({
            query: (data: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.subscribe}`,
                method: 'POST',
                body: data
            }),
        }),

        getMessages:builder.query({
            query: (url: any) => ({
                url: `${VITE_BASE_URL}/${apiRoutes.contact_message}`,
            }),
        }),

        bookEvent: builder.mutation({
            query:(formdata: any) =>({
                url: `${VITE_BASE_URL}/${apiRoutes.book}`,
                method: 'POST',
                body: formdata,
            }),
        }),


    })
});

export const {
    useLoginMutation,
    useGetHeroQuery,
    useGetHeroByIdQuery,
    useAddHeroDetailsMutation,
    useUpdateHeroDetailsMutation,
    useDeleteHeroDetailsMutation,
    useGetAboutQuery,
    useGetAboutByIdQuery,
    useUpdateAboutMutation,
    useGetYoutubeQuery,
    useUpdateYoutubeMutation,
    useGetTeamQuery,
    useGetMemberByIdQuery,
    useAddTeamMutation,
    useUpdateMemberMutation,
    useDeleteMemberMutation,
    useGetStockQuery,
    useGetStockByIdQuery,
    useAddStockMutation,
    useUpdateStockMutation,
    useDeleteStockMutation,
    useGetEventQuery,
    useGetEventByIdQuery,
    useAddEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useGetContactQuery,
    useUpdateContactMutation,
    useGetGivingQuery,
    useEditGivingOptionMutation,
    useGetOptionsQuery,
    useGetGalleryQuery,
    useGetGallerytByIdQuery,
    useAddGalleryImageMutation,
    useUpdateGalleryImageMutation,
    useDeleteGalleryImageMutation,
    useGetSubscribersQuery,
    useGetMembersQuery,
    useGetUserQuery,
    useGetAccountQuery,
    useCreateAccountMutation,
    useEditAccountMutation,
    useDeleteAccountMutation,
    useGetLiveQuery,
    useGetLiveByIdQuery,
    useAddLiveMutation,
    useEditLiveMutation,
    useDeleteLiveMutation,
    useOnlineAccountQuery,
    useCreateOnlineAccountMutation,
    useEditOnlineAccountMutation,
    useDeleteOnlineAccountMutation,
    useBanksQuery,
    useCountriesQuery,
    useContact_messageMutation,
    useSubscribeMutation,
    useGetMessagesQuery,
    useBookEventMutation,
} = api