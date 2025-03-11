import { useAddHeroDetailsMutation } from '@/app/api'
import { useForm } from 'react-hook-form';
import { Navigate} from 'react-router-dom';

interface FormDataDetail {
    name: string;
    description: string;
    price: string;
    image: string;
}

const useStore = () => {
    const [addHero, isLoading] = useAddHeroDetailsMutation()

    const {
        register: addItemDetail, 
        handleSubmit,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            image: ''
        },
    });

    const rules = {
        name: {
            required: 'Page title is very much required',
        },
        image: {
            required: 'Hero Image is required',
        }
    };

    async function onSubmit(data: FormDataDetail){
        const {name, description, price, image } = data;

        const formdata = new FormData()

        formdata.append('title', name)
        formdata.append('message', description)
        formdata.append('buttonText', price)
        
        if (image && image.length > 0) {
            formdata.append('photo', image[0]);
        }

        try{
            await addHero(formdata).unwrap()
            return <Navigate to={'/dashboard/cms/store'} />
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading,
    formInstance: {addItemDetail, handleSubmit, errors, rules},
    onSubmit,
  }
}

export default useStore
