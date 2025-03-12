import { useAddGalleryImageMutation, useAddHeroDetailsMutation, useAddStockMutation, useGetGallerytByIdQuery, useGetStockByIdQuery, useUpdateGalleryImageMutation, useUpdateStockMutation } from '@/app/api'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams} from 'react-router-dom';

interface FormDataDetail {
    title: string;
    event: string;
    image: FileList;
}

const useGallery = () => {
    const {id} = useParams()
    const {data: galleryImage} = useGetGallerytByIdQuery<any>(id, {skip: !id})
    const [addImage, isLoading] = useAddGalleryImageMutation()
    const [updateGalleryImage] = useUpdateGalleryImageMutation()

    const {
        register: addItemDetail, 
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            title: '',
            event: '',
        },
    });

    useEffect(()=>{
        if(galleryImage?.data){
        setValue('title', galleryImage?.data?.title );
        setValue('event', galleryImage?.data?.event)
        setValue('image', galleryImage?.data?.photo?.url || '' as unknown as FileList)
        }
    },[galleryImage?.data, setValue])

    const rules = {
        name: {
            required: 'item name is very much required',
        },
        image: {
            required: 'Image is required',
        }
    };

    async function onSubmit(data: FormDataDetail){
        const {title, event, image } = data;

        const formdata = new FormData()

        formdata.append('title', title)
        formdata.append('event', event)
        
        if (image && image.length > 0 && image[0] instanceof File && image[0] !== galleryImage?.data?.coverPhoto?.url) {
            formdata.append('photo', image[0]);
        }

        try{
            if(id){
                await updateGalleryImage({formdata, id}).unwrap()
            }else{

                await addImage(formdata).unwrap()
            }
            return window.location.href= '/dashboard/cms/gallery'
            // return <Navigate to={'/dashboard/cms/store'} />
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading,
    formInstance: {addItemDetail, handleSubmit, errors, rules},
    onSubmit,
    fetchedImage: galleryImage?.data?.photo?.url,
  }
}

export default useGallery
