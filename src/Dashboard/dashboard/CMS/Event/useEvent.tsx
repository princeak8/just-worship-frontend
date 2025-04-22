import { useAddEventMutation, useGetEventByIdQuery, useUpdateEventMutation } from '@/app/api'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams} from 'react-router-dom';

interface FormDataDetail {
    name: string;
    date: string;
    description: string;
    image: FileList;
}

const useEvent = () => {
    const {id} = useParams()
  const {data: event} = useGetEventByIdQuery<any>(id, {skip: !id})
    const [addEvent, {isLoading: isLoading101}] = useAddEventMutation()
    const [updateEvent] = useUpdateEventMutation()

    // console.log("id: ", getHeroById)

    const {
        register: addEventDetail, 
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            name: '',
            date: '',
            description: '',
        },
    });

    useEffect(() => {
        if(event?.data){
            setValue('name', event?.data?.name)
            setValue('date', event?.data.date?.toLocaleString())
            setValue('description', event?.data?.content)
            setValue('image',  event?.data?.coverPhoto?.url || '' as unknown as FileList )
        }
    }, [event?.data, setValue])

    const rules = {
        title: {
            required: 'Page title is very much required',
        },
        image: {
            required: 'Hero Image is required',
        }
    };

    async function onSubmit(data: FormDataDetail){
        const {name, description, date, image} = data;

        const formdata = new FormData()

        formdata.append('name', name)
        formdata.append('eventDate', date)
        formdata.append('content', description)
        
        if (image && image.length > 0 && image[0] instanceof File && image[0] !== event?.data?.coverPhoto?.url) {
            formdata.append('coverPhoto', image[0]);
        }

        try{
            if(id){
                await updateEvent({formdata, id}).unwrap()
            }else{
                await addEvent(formdata).unwrap()
            }
            return window.location.href='/dashboard/cms/events'
            // return <Navigate to={'/dashboard/cms/events'} />
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading101,
    formInstance: { addEventDetail, handleSubmit, errors, rules},
    onSubmit,
    fetchedImage: event?.data?.coverPhoto?.url,
  }
}

export default useEvent
