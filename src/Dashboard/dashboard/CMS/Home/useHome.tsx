import { useAddHeroDetailsMutation, useGetHeroByIdQuery, useUpdateHeroDetailsMutation } from '@/app/api'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams} from 'react-router-dom';

interface FormDataDetail {
    title: string;
    description: string;
    button_text: string;
    button_link: string;
    image: FileList;
}

const useHome = () => {
    const {id} = useParams()
  const {data: getHeroById } = useGetHeroByIdQuery<any>(id, {skip: !id})
    const [addHero, {isLoading: isLoading100}] = useAddHeroDetailsMutation()
    const [updateHeroDetails] = useUpdateHeroDetailsMutation()

    // console.log("id: ", getHeroById)

    const {
        register: addHeroDetail, 
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            title: '',
            description: '',
            button_text: '',
            button_link: '',
        },
    });

    useEffect(()=>{
        if(getHeroById?.data){
            setValue('title', getHeroById?.data?.title)
            setValue('description', getHeroById?.data?.message)
            setValue('button_text', getHeroById?.data?.buttonText)
            setValue('button_link', getHeroById?.data?.buttonUrl)
            setValue('image', getHeroById?.data?.photo?.url || '' as unknown as FileList)
        }
    },[getHeroById?.data, setValue])

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
        formdata.append('buttonUrl', button_link)
        
        if (image && image.length > 0 && image[0] instanceof File && image[0] !== getHeroById?.data?.photo?.url) {
            formdata.append('photo', image[0]);
        }

        try{
            if(id){
                await updateHeroDetails({formdata, id}).unwrap()
            }else{
                await addHero(formdata).unwrap()
            }
            return window.location.href='/dashboard/cms/home'
            // return <Navigate to={'/dashboard/cms/home'} />
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading100,
    formInstance: {addHeroDetail, handleSubmit, errors, rules},
    onSubmit,
    fetchedImage: getHeroById?.data?.photo?.url,
  }
}

export default useHome
