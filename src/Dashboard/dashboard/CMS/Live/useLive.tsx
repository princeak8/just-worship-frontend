import { useAddEventMutation, useAddLiveMutation, useEditLiveMutation, useGetEventByIdQuery, useGetLiveByIdQuery, useUpdateEventMutation } from '@/app/api'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';

interface FormDataDetail {
    title: string;
    date: string;
    time: string;
    description: string;
    url: string;
    image: FileList;
}

const useLive = () => {
    const { id } = useParams()
    const { data: live } = useGetLiveByIdQuery<any>(id, { skip: !id })
    const [addLive, isLoading] = useAddLiveMutation()
    const [updateLive] = useEditLiveMutation()

    // console.log("id: ", getHeroById)

    function convert24To12(time24: any) {
        // Split the input into hours and minutes
        const [hourStr, minuteStr] = time24.split(':');
        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);

        // Determine AM/PM period
        const period = hour < 12 ? 'AM' : 'PM';

        // Convert hour to 12-hour format
        hour = hour % 12 || 12; // Handles 0 (midnight) becoming 12 AM

        // Format minute to always be two digits
        const formattedMinute = minute.toString().padStart(2, '0');

        // Combine into the final string
        return `${hour}:${formattedMinute} ${period}`;
    }

    const {
        register: addEventDetail,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormDataDetail>({
        defaultValues: {
            title: '',
            date: '',
            time: '',
            description: '',
            url: '',
        },
    });

    useEffect(() => {
        if (live?.data) {
            setValue('title', live?.data?.title)
            setValue('date', live?.data.date?.toLocaleString())
            setValue('time', live?.data.time?.toLocaleString())
            setValue('description', live?.data?.description)
            setValue('image', live?.data?.coverPhoto?.url || '' as unknown as FileList)
        }
    }, [live?.data, setValue])

    const rules = {
        title: {
            required: 'Page title is very much required',
        },
        image: {
            required: 'Hero Image is required',
        }
    };

    async function onSubmit(data: FormDataDetail) {
        const { url, title, description, date, time, image } = data;

        const formdata = new FormData()

        formdata.append('url', url)
        formdata.append('title', title)
        formdata.append('liveDate', date)
        formdata.append('liveTime', time)

        formdata.append('content', description)

        if (image && image.length > 0 && image[0] instanceof File && image[0] !== live?.data?.coverPhoto?.url) {
            formdata.append('coverPhoto', image[0]);
        }

        try {
            if (id) {
                await updateLive({ formdata, id }).unwrap()
            } else {
                await addLive(formdata).unwrap()
            }
            return window.location.href = '/dashboard/cms/live'
            // return <Navigate to={'/dashboard/cms/events'} />
        } catch (err) {
            console.log(err)
        }
    }


    return {
        isLoading,
        formInstance: { addEventDetail, handleSubmit, errors, rules },
        onSubmit,
        fetchedImage: live?.data?.coverPhoto?.url,
    }
}

export default useLive
