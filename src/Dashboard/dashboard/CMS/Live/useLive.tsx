import { useAddEventMutation, useAddLiveMutation, useEditLiveMutation, useGetEventByIdQuery, useGetLiveByIdQuery, useUpdateEventMutation } from '@/app/api'
import { max_size } from '@/utils/max_size';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';

interface FormDataDetail {
    title: string;
    liveDate: string;
    liveTime: string;
    description: string;
    url: string;
    image: FileList;
}

const useLive = () => {
    const { id } = useParams()
    const { data: live } = useGetLiveByIdQuery<any>(id, { skip: !id })
    const [addLive, { isLoading: isLoading20, error }] = useAddLiveMutation()
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
        setError,
        formState: { errors },
    } = useForm<FormDataDetail>({
        defaultValues: {
            title: '',
            liveDate: '',
            liveTime: '',
            description: '',
            url: '',
        },
    });

    useEffect(() => {
        if (live?.data) {
            setValue('title', live?.data?.title)
            setValue('liveDate', live?.data.date?.toLocaleString())
            setValue('liveTime', live?.data.time?.toLocaleString())
            setValue('description', live?.data?.description)
            setValue('url', live?.data?.url)
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
        const { url, title, description, liveDate, liveTime, image } = data;

        if (!title) {
            setError('title', {
                type: 'manual',
                message: 'Title field cannot be empty',
            });
            return;
        }

        if (!liveDate) {
            setError('liveDate', {
                type: 'manual',
                message: 'Date field cannot be empty',
            });
            return;
        }

         if (!liveTime) {
            setError('liveTime', {
                type: 'manual',
                message: 'Time field cannot be empty',
            });
            return;
        }

         if (!url) {
            setError('url', {
                type: 'manual',
                message: 'URL field is required',
            });
            return;
        }

        


        if (image.length === 0) {
            setError('image', { type: 'manual', message: 'Image is required' });
            return;
        }

        if (image[0].size > max_size) {
            setError('image', {
                type: 'manual',
                message: 'Image must not be larger than 20 MB',
            });
            return;
        }

        const formdata = new FormData()

        formdata.append('url', url)
        formdata.append('title', title)
        formdata.append('liveDate', liveDate)
        formdata.append('liveTime', liveTime)
        formdata.append('description', description)

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
        } catch (err: any) {
            console.log(err);
            const validation = err?.data?.errors;
            if (validation && typeof validation === 'object') {
                Object.entries(validation).forEach(([field, messages]) => {
                    const formField = field === 'coverPhoto' ? 'image' : (field as keyof FormDataDetail);
                    const messageText = Array.isArray(messages) ? messages[0] : (messages as string);
                    setError(formField as any, { type: 'server', message: messageText });
                });
            } else {
                console.error('Unexpected error:', err);
            }
        }
    }


    return {
        isLoading20,
        formInstance: { addEventDetail, handleSubmit, errors, rules },
        onSubmit,
        fetchedImage: live?.data?.coverPhoto?.url,
    }
}

export default useLive
