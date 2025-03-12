import { useAddTeamMutation, useGetMemberByIdQuery, useUpdateMemberMutation } from '@/app/api'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams} from 'react-router-dom';

interface FormDataDetail {
    name: string;
    biography: string;
    position: string;
    image: FileList;
}

const useTeam = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [addMember, {isLoading}] = useAddTeamMutation()
    const [updateMember] = useUpdateMemberMutation()
    const {data: member, isLoading: loading} = useGetMemberByIdQuery<any | object | null>(id, {skip: !id})

    // console.log("data: ", data.data.name)

    const {
        register: addMemberDetail, 
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            name: '',
            position: '',
            biography: '',
        },
    });

    useEffect(() =>{
           if(member?.data){
           setValue('name', member?.data?.name || '');
           setValue('position', member?.data?.position || '');
           setValue('biography', member?.data?.biography || '');
           setValue('image', member?.data?.photo.url || '' as unknown as FileList);
           }
    }, [member, setValue])

    const rules = {
        name: {
            required: 'Page title is very much required',
        },
        image: {
            required: 'Hero Image is required',
        }
    };

    async function onSubmit(data: FormDataDetail){
        const {name, biography, position, image} = data;

        const formdata = new FormData()
        console.log('submit: ', data)
        formdata.append('name', name)
        formdata.append('biography', biography)
        formdata.append('position', position)
        
        if (image && image.length > 0 && image[0] instanceof File && image[0] !== member?.data?.photo?.url) {
            formdata.append('photo', image[0]);
        }

        try{
            if(id){
                await updateMember({ formdata, id }).unwrap()
            }else{
                await addMember(formdata).unwrap()
            }
            return window.location.href = '/dashboard/cms/team'
            // return navigate('/dashboard/cms/team')
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading,
    formInstance: {addMemberDetail, handleSubmit, errors, rules},
    onSubmit,
    memberImage: member?.data?.photo?.url,
  }
}

export default useTeam
