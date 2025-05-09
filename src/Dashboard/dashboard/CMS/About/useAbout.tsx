import { useAddHeroDetailsMutation,useGetAboutQuery, useUpdateAboutMutation } from '@/app/api'
import { max_size } from '@/utils/max_size';
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

const useAbout = () => {
    const {id} = useParams()
  const { data: about, isLoading } = useGetAboutQuery<ApiResponse|any>(undefined);
    const [updateAbout, {isLoading: load, error}] = useUpdateAboutMutation()

    // console.log("id: ", getAboutById)

    const {
        register: addHeroDetail, 
        handleSubmit,
        setValue,
        setError,
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

    useEffect(()=>{
        if(about?.data){
            setValue('header', about?.data?.header)
            setValue('content', about?.data?.content)
            setValue('vision', about?.data?.vision)
            setValue('mission', about?.data?.mission)
            setValue('pastorTitle', about?.data?.pastorTitle)
            setValue('pastorBio', about?.data?.pastorBio)
            setValue('image', about?.data?.pastorPhoto?.url || '' as unknown as FileList )
        }
    },[about?.data])

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

        if(!header){
          setError('header',{
              type: 'manual',
              message: 'Header field cannot be empty',
          });
          return;
        }

        if(!content){
          setError('content',{
            type: 'manual',
            message: 'Detailed Content Field is required',
          });
          return;
        }

        if(!vision){
          setError('vision',{
            type: 'manual',
            message: 'Please add a vision statement',
          });
          return;
        }

        if(!mission){
          setError('mission',{
            type: 'manual',
            message: 'Please add a mission statement',
          });
          return;
        }

        if(!pastorBio){
          setError('pastorBio',{
            type: 'manual',
            message: 'Pastors Bio cannot be empty',
          });
          return;
        }


        if (image.length === 0) {
          setError('image', { type: 'manual', message: 'Image is required' });
          return;
        }
        
        if (image[0].size > max_size) {
          setError('image', {
            type: 'manual',
            message: 'Image must not be larger than 20 MB',
          });
          return;
        }

        const formdata = new FormData()

        formdata.append('header', header)
        formdata.append('content', content)
        formdata.append('vision', vision)
        formdata.append('mission', mission)
        formdata.append('pastorTitle', pastorTitle)
        formdata.append('pastorBio', pastorBio )
        
        if (image && image.length > 0 && image[0] instanceof File && image[0] !== about?.data?.pastorPhoto?.url && image[0]?.size > max_size ) {
            formdata.append('pastorPhoto', image[0]);
        }

        try{
            await updateAbout(formdata).unwrap()
            return window.location.href='/dashboard/cms/about'
            // return <Navigate to={'/dashboard/cms/about'} />
        }catch(err: any){
            console.log(err)
            if (err?.data && typeof err.data === 'object') {
              Object.entries(err.data).forEach(([field, msg]) => {
                  setError(field as keyof FormDataDetail, {
                      type: 'server',
                      message: msg as string,
                  });
              });
          } else {
              console.error('Unexpected error:', err);
          }
        }
    }


  return{
    isLoading,
    formInstance: {addHeroDetail, handleSubmit, errors, rules},
    onSubmit,
    fetchedImage: about?.data?.pastorPhoto?.url ,
  }
}

export default useAbout

