import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle, Loader2, Save } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Placeholder from '@/public/photo1.png'
import useTeam from './useTeam';
import { TextArea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGetHeroQuery } from '@/app/api';

interface Slide {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function AddTeam() {
  const {id} = useParams()
  const { formInstance, isLoading, onSubmit, memberImage } = useTeam()
  const { handleSubmit, addMemberDetail, errors } = formInstance;

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  useEffect(() => {
    if (memberImage) {
      setPreviewImage(memberImage);
    }
  }, [memberImage]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className='flex items-center justify-between'>
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Link to='/dashboard/cms/team' ><ArrowLeftCircle  className='hover:text-[#BA833C]' /></Link>Team Page Manager</h1>
          {isLoading ?(
             <Button className='flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white'><Loader2 className='animate-spin' /></Button>
          ):(
            <Button type='submit' className='flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white'><Save className="w-4 h-4" />{id ? 'Update Member' : 'Save Member'}</Button>
          )}
        </div>

        <div className="flex gap-8">
          <div className='w-8/12'>
            <Card>
              <CardHeader>
                <CardTitle>
                  {id ? 'Edit member' : 'New Member'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Name <span className='text-red-500'>*</span></Label>
                    <Input
                      id="name"
                      {...addMemberDetail('name')}
                    />
                    {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                  </div>

                  <div>
                    <Label>Position</Label>
                    <Input
                      id="position"
                      {...addMemberDetail('position')}
                    />
                     {errors.position && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.position.message}
                    </p>
                  )}
                  </div>
                  <div>
                    <Label>Biography</Label>
                    <TextArea
                      id="biography"
                      rows={3}
                      {...addMemberDetail('biography')}
                    />
                     {errors.biography && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.biography.message}
                    </p>
                  )}
                  </div>


                  {/* <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label>Button Text</Label>
                      <Input
                        id="button_text"
                        {...addHeroDetail('button_text')}
                      />
                    </div>

                    <div>
                      <Label>Button Link</Label>
                      <Input
                        id="buttonLink"
                        {...addHeroDetail('button_link')}
                      />
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='w-4/12'>
            <Card>
              <CardHeader>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Profile <span className='text-red-500'>*</span></Label>
                  <img
                    src={previewImage || Placeholder}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded"
                  />
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="mt-1"
                    {...addMemberDetail('image', {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        addMemberDetail('image').onChange(e);
                        handleFileChange(e);
                      },
                    })}
                  />
                    {errors.image && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.image.message}
                    </p>
                  )}

                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}