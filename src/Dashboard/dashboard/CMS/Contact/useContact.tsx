import { useAddHeroDetailsMutation, useGetContactQuery, useUpdateContactMutation } from '@/app/api'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams} from 'react-router-dom';

interface FormDataDetail {
    address: string;
    email: string;
    phoneNumber: string;
}

const useContact = () => {
    const {id} = useParams()
  const {data: contact} = useGetContactQuery<any | undefined>(undefined)
    const [updateContact, {isLoading: isLoading9}] = useUpdateContactMutation()

    // console.log("id: ", getAboutById)

    const {
        register: addContactDetail, 
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            address: '',
            email: '',
            phoneNumber: '',
        },
    });

    useEffect(()=> {
        if(contact?.data){
            setValue('address', contact?.data.address )
            setValue('email', contact?.data.email )
            setValue('phoneNumber', contact?.data.phoneNumber )
        }
    },[contact?.data])

    const rules = {
        title: {
            required: 'Page title is very much required',
        },
        image: {
            required: 'Hero Image is required',
        }
    };

    async function onSubmit(data: FormDataDetail){
        const {address, email, phoneNumber } = data;

        const formdata = new FormData()

        formdata.append('address', address)
        formdata.append('email', email)
        formdata.append('phoneNumber', phoneNumber)

        try{
            await updateContact(formdata).unwrap()
            return window.location.href='/dashboard/cms/contact'
            // return <Navigate to={'/dashboard/cms/contact'} />
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading9,
    formInstance: {addContactDetail, handleSubmit, errors, rules},
    onSubmit,
  }
}

export default useContact
