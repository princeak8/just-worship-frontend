import { useAddHeroDetailsMutation, useAddStockMutation, useGetStockByIdQuery, useUpdateStockMutation } from '@/app/api'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams} from 'react-router-dom';

interface FormDataDetail {
    name: string;
    description: string;
    price: string;
    image: FileList;
}

const useStore = () => {
    const {id} = useParams()
    const {data: stock} = useGetStockByIdQuery<any>(id, {skip: !id})
    const [addItem, isLoading] = useAddStockMutation()
    const [updateStock] = useUpdateStockMutation()

    const {
        register: addItemDetail, 
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            name: '',
            description: '',
            price: '',
        },
    });

    useEffect(()=>{
        if(stock?.data){
        setValue('name', stock?.data?.name );
        setValue('price', stock?.data?.price)
        setValue('description', stock?.data?.description)
        setValue('image', stock?.data?.coverPhoto?.url || '' as unknown as FileList)
        }
    },[stock?.data, setValue])

    const rules = {
        name: {
            required: 'item name is very much required',
        },
        image: {
            required: 'Image is required',
        }
    };

    async function onSubmit(data: FormDataDetail){
        const {name, description, price, image } = data;

        const formdata = new FormData()

        formdata.append('name', name)
        formdata.append('price', price)
        formdata.append('description', description)
        
        if (image && image.length > 0 && image[0] instanceof File && image[0] !== stock?.data?.coverPhoto?.url) {
            formdata.append('coverPhoto', image[0]);
        }

        try{
            if(id){
                await updateStock({formdata, id}).unwrap()
            }else{

                await addItem(formdata).unwrap()
            }
            return window.location.href= '/dashboard/cms/store'
            // return <Navigate to={'/dashboard/cms/store'} />
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading,
    formInstance: {addItemDetail, handleSubmit, errors, rules},
    onSubmit,
    fetchedImage: stock?.data?.coverPhoto?.url,
  }
}

export default useStore
