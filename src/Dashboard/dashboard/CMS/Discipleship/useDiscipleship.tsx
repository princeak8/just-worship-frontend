import { useSaveDiscipleshipMutation, useGetDiscipleshipQuery, useUpdateDiscipleshipMutation, useCountriesQuery } from '@/app/api'
import { max_size } from '@/utils/max_size';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams} from 'react-router-dom';
import { Discipleship } from '@/app/types';

interface FormDataDetail {
    name: string;
    month: number;
    year: number;
    open?: boolean;
    countryId?: number;
    photo?: FileList;
    venue?: string;
    online?: string;
    link?: string;
    deadline?: string;
}

const useEvent = () => {
    const {id} = useParams()
  const {data: discipleship} = useGetDiscipleshipQuery<any>(id, {skip: !id})
    const [addDiscipleship, {isLoading: isLoading101}] = useSaveDiscipleshipMutation()
    const [updateDiscipleship] = useUpdateDiscipleshipMutation()
    const [online, setOnline] = useState(false)

    // console.log("id: ", getHeroById)

    const {
        register: addDiscipleshipDetail, 
        handleSubmit,
        setValue,
        setError,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            name: '',
            month: 1,
            year: 2025,
            open: true,
            countryId: 156,
            venue: '',
            online: '',
            link: '',
            deadline: '',
        },
    });
      
    useEffect(() => {
        if(discipleship?.data) {
            setValue('name', discipleship?.data?.name)
            
            setValue('month', discipleship?.data?.month)
            setValue('year', discipleship?.data?.year)
            setValue('photo',  discipleship?.data?.photo?.url || '' as unknown as FileList )
            setValue('open', discipleship?.data?.open)
            setValue('countryId', discipleship?.data?.countryId)
            setValue('venue', discipleship?.data?.venue)
            setValue('online', discipleship?.data?.online)
            setValue('link', discipleship?.data?.link)
            setValue('deadline', discipleship?.data?.deadline)
        }
    }, [discipleship?.data, setValue])

    const rules = {
        name: {
            required: 'name is very much required',
        },
        photo: {
            required: 'Photo is required',
        }
    };

    async function onSubmit(data: FormDataDetail){
        let {name, month, year, open, countryId, venue, online, link, deadline, photo} = data;
        let preparedMonth = month.toString();
        if (month < 10) preparedMonth = '0'+preparedMonth;

        if(photo && photo.length > 0 && photo[0] instanceof File) {
            if(photo[0].size > max_size){
                setError('photo', {
                    type: 'manual',
                    message: 'Photo must not be larger than 10 MB',
                })
                return;
            }
        }

        const formdata = new FormData()

        // console.log('Original time from form:', time);
        
        // if (!time || time.trim() === '') {
        //     setError('time', {
        //         type: 'manual',
        //         message: 'Time is required',
        //     });
        //     return;
        // }

        formdata.append('name', name)
        formdata.append('month', preparedMonth)
        formdata.append('year', year.toString())
        formdata.append('open', open ? "1" : "0")
        if(countryId) formdata.append('countryId', countryId?.toString())
        if(venue) formdata.append('venue', venue)
        formdata.append('online', online ? '1' : '0');
        if(link) formdata.append('link', link);
        if(deadline) formdata.append('deadline', deadline)

        
        if (photo && photo.length > 0 && photo[0] instanceof File) {
            formdata.append('photo', photo[0]);
        }

        try{
            if(id){
                await updateDiscipleship({formdata, id}).unwrap()
            }else{
                await addDiscipleship(formdata).unwrap()
            }
            return window.location.href='/dashboard/cms/discipleships'
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading101,
    online, 
    setOnline,
    formInstance: { addDiscipleshipDetail, handleSubmit, errors, rules},
    onSubmit,
    fetchedPhoto: discipleship?.data?.photo?.url,
  }
}

export default useEvent
