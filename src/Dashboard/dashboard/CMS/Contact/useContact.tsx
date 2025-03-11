import { useAddHeroDetailsMutation, useGetContactQuery } from '@/app/api'
import { useForm } from 'react-hook-form';
import { Navigate, useParams} from 'react-router-dom';

interface FormDataDetail {
    address: string;
    email: string;
    phoneNumber: string;
}

const useContact = () => {
    const {id} = useParams()
  const {getContact} = useGetContactQuery<any>(id, {skip: !id})
    const [addHero, isLoading] = useAddHeroDetailsMutation()

    // console.log("id: ", getAboutById)

    const {
        register: addContactDetail, 
        handleSubmit,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            address: getContact?.address || '',
            email: getContact?.email || '',
            phoneNumber: getContact?.phoneNumber || '',
        },
    });

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

        formdata.append('title', address)
        formdata.append('message', email)
        formdata.append('buttonText', phoneNumber)

        try{
            await addHero(formdata).unwrap()
            return <Navigate to={'/dashboard/cms/contact'} />
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading,
    formInstance: {addContactDetail, handleSubmit, errors, rules},
    onSubmit,
  }
}

export default useContact
