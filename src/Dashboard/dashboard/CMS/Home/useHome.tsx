import { useAddHeroDetailsMutation, useGetHeroByIdQuery } from '@/app/api'
import { useForm } from 'react-hook-form';
import { Navigate, useParams} from 'react-router-dom';

interface FormDataDetail {
    title: string;
    description: string;
    button_text: string;
    button_link: string;
    image: FileList;
}

const useHome = () => {
    const {id} = useParams()
  const {getHeroById} = useGetHeroByIdQuery<any>(id, {skip: !id})
    const [addHero, isLoading] = useAddHeroDetailsMutation()

    console.log("id: ", getHeroById)

    const {
        register: addHeroDetail, 
        handleSubmit,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            title: '',
            description: '',
            button_text: '',
            button_link: '',
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
        const {title, description, button_text, button_link, image} = data;

        const formdata = new FormData()

        formdata.append('title', title)
        formdata.append('message', description)
        formdata.append('buttonText', button_text)
        formdata.append('button_link', button_link)
        
        if (image && image.length > 0) {
            formdata.append('photo', image[0]);
        }

        try{
            await addHero(formdata).unwrap()
            return <Navigate to={'/dashboard/cms/home'} />
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading,
    formInstance: {addHeroDetail, handleSubmit, errors, rules},
    onSubmit,
  }
}

export default useHome
