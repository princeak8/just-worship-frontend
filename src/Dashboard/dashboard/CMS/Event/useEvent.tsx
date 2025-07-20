import { useAddEventMutation, useGetEventByIdQuery, useUpdateEventMutation } from '@/app/api'
import { max_size } from '@/utils/max_size';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams} from 'react-router-dom';

interface FormDataDetail {
    name: string;
    date: string;
    time: string;
    description: string;
    image: FileList;
    featured: number;
    location: string;
}

const useEvent = () => {
    const {id} = useParams()
  const {data: event} = useGetEventByIdQuery<any>(id, {skip: !id})
    const [addEvent, {isLoading: isLoading101}] = useAddEventMutation()
    const [updateEvent] = useUpdateEventMutation()
    const [checked, setCheck] = useState(false)

    // console.log("id: ", getHeroById)

    const {
        register: addEventDetail, 
        handleSubmit,
        setValue,
        setError,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            name: '',
            date: '',
            time:'',
            description: '',
            location: '',
        },
    });

    function convert24to12(raw: string) {
        if (!raw || typeof raw !== 'string') return '';
        
        const [h, m] = raw.split(':').map(Number);
        if (isNaN(h) || isNaN(m)) return '';
        
        const period = h >= 12 ? 'PM' : 'AM';
        const hour12 = (((h + 11) % 12) + 1).toString();
        const minute = m.toString().padStart(2, '0');
        return `${hour12}:${minute} ${period}`;
    }

    function convert12to24(time12h: string) {
        if (!time12h || typeof time12h !== 'string') return '';
        
        const [time, period] = time12h.split(' ');
        if (!time || !period) return '';
        
        let [hours, minutes] = time.split(':').map(Number);
        
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
      
      

    useEffect(() => {
        if(event?.data){
            setValue('name', event?.data?.name)
            
            
            if (event?.data.date) {
                const date = new Date(event?.data.date);
                const formattedDate = date.toISOString().split('T')[0]; 
                setValue('date', formattedDate);
            }
            
            if (event?.data.time) {
                console.log('Time from backend:', event?.data.time);
                if (event?.data.time.includes('AM') || event?.data.time.includes('PM')) {
                    const time24h = convert12to24(event?.data.time)
                    console.log('Converted 12h to 24h format:', time24h);
                    setValue('time', time24h)
                } else {
                    console.log('Time already in 24h format:', event?.data.time);
                    setValue('time', event?.data.time)
                }
            }
            setValue('location', event?.data?.location)
            setValue('description', event?.data?.content)
            setValue('image',  event?.data?.coverPhoto?.url || '' as unknown as FileList )
            setValue('featured', event?.data?.featured)
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
        const {name, description, location, date, time, image} = data;

        if(image && image.length > 0 && image[0] instanceof File) {
            if(image[0].size > max_size){
                setError('image', {
                    type: 'manual',
                    message: 'Image must not be larger than 20 MB',
                })
                return;
            }
        }

        const formdata = new FormData()

        console.log('Original time from form:', time);
        
        if (!time || time.trim() === '') {
            setError('time', {
                type: 'manual',
                message: 'Time is required',
            });
            return;
        }
        
        let formattedTime = convert24to12(time);
        console.log('Converted time for backend:', formattedTime);
        
        console.log('Time string length:', formattedTime.length);
        console.log('Time string char codes:', Array.from(formattedTime).map(c => c.charCodeAt(0)));
        console.log('Time string trimmed:', formattedTime.trim());
        
        formattedTime = formattedTime.trim();
        

        const [h, m] = time.split(':').map(Number);
        const period = h >= 12 ? 'PM' : 'AM';
        const hour12 = (((h + 11) % 12) + 1).toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        const alternativeFormat = `${hour12}:${minute} ${period}`;
        
        console.log('Alternative format (with leading zeros):', alternativeFormat);
        
        formattedTime = alternativeFormat;

        formdata.append('name', name)
        formdata.append('eventDate', date)
        formdata.append('eventTime', formattedTime)
        formdata.append('content', description)
        formdata.append('location', location)
        formdata.append('featured', checked ? '1' : '0');

        
        if (image && image.length > 0 && image[0] instanceof File) {
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
    checked, 
    setCheck,
    formInstance: { addEventDetail, handleSubmit, errors, rules},
    onSubmit,
    fetchedImage: event?.data?.coverPhoto?.url,
  }
}

export default useEvent
