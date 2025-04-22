import { useAddHeroDetailsMutation,useGetAboutQuery, useUpdateAboutMutation } from '@/app/api'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams} from 'react-router-dom';

interface AboutSection {
    id: number;
    header: string;
    content: string;
    pastorTitle: string;
    pastorBio: string;
    pastorPhoto?: {
      id: number;
      url: string;
      mimeType: string;
      filename: string;
      extension: string;
      size: number;
    };
    vision: string;
    visionPhoto?: {
      id: number;
      url: string;
      mimeType: string;
      filename: string;
      extension: string;
      size: number;
    };
    mission: string;
    missionPhoto?: {
      id: number;
      url: string;
      mimeType: string;
      filename: string;
      extension: string;
      size: number;
    };
  }

interface FormDataDetail {
    header: string,
    content: string,
    vision: string,
    mission: string,
    pastorTitle: string,
    pastorBio: string,
    image: FileList;

}

interface ApiResponse {
    statusCode: number;
    data: AboutSection;
  }

const useMessages = () => {
    const {id} = useParams()
  const { data: about, isLoading } = useGetAboutQuery<ApiResponse|any>(undefined);
    const [updateAbout, {isLoading: isLoading22}] = useUpdateAboutMutation()

    // console.log("id: ", getAboutById)

    const {
        register: addHeroDetail, 
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormDataDetail>({
        defaultValues: {
            header: '',
            content: '',
            vision: '',
            mission: '',
            pastorTitle: '',
            pastorBio: '',
        },
    });

    // useEffect(()=>{
    //     if(about?.data){
    //         setValue('header', about?.data?.header)
    //         setValue('content', about?.data?.content)
    //         setValue('vision', about?.data?.vision)
    //         setValue('mission', about?.data?.mission)
    //         setValue('pastorTitle', about?.data?.pastorTitle)
    //         setValue('pastorBio', about?.data?.pastorBio)
    //         setValue('image', about?.data?.pastorPhoto?.url || '' as unknown as FileList )
    //     }
    // },[about?.data])

    const rules = {
        title: {
            required: 'Page title is very much required',
        },
        image: {
            required: 'Hero Image is required',
        }
    };

    async function onSubmit(data: FormDataDetail){
        const {header, content, vision, mission, pastorTitle, pastorBio, image} = data;

        const formdata = new FormData()

        formdata.append('header', header)
        formdata.append('content', content)
        formdata.append('vision', vision)
        formdata.append('mission', mission)
        formdata.append('pastorTitle', pastorTitle)
        formdata.append('pastorBio', pastorBio )
        
        if (image && image.length > 0 && image[0] instanceof File && image[0] !== about?.data?.pastorPhoto?.url) {
            formdata.append('pastorPhoto', image[0]);
        }

        try{
            // await updateAbout(formdata).unwrap()
            return window.location.href='/dashboard/cms/messages'
            // return <Navigate to={'/dashboard/cms/about'} />
        }catch(err){
            console.log(err)
        }
    }


  return{
    isLoading22,
    formInstance: {addHeroDetail, handleSubmit, errors, rules},
    onSubmit,
    fetchedImage: about?.data?.pastorPhoto?.url ,
  }
}

export default useMessages

