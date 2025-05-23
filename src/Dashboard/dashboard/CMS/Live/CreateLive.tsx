import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle, Loader2, Save } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Placeholder from '@/public/photo1.png'
import useEvent from './useLive';
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

export default function CreateLive() {
  const { id } = useParams()
  const { formInstance, isLoading20, onSubmit, fetchedImage } = useEvent()
  const { handleSubmit, addEventDetail, errors } = formInstance;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (fetchedImage) {
      setPreviewImage(fetchedImage)
    }
  }, [fetchedImage])

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
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Link to='/dashboard/cms/live' ><ArrowLeftCircle className='hover:text-[#BA833C]' /></Link>Live Page Manager</h1>
          {isLoading20 ? (
            <Button className='flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white'><Loader2 className='animate-spin' /></Button>
          ) : (
            <Button type='submit' className='flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white'><Save className="w-4 h-4" />{id ? 'Update Live' : 'Save Live'}</Button>
          )}
        </div>

        <div className="flex gap-8">
          <div className='w-8/12'>
            <Card>
              <CardHeader>
                <CardTitle>
                  {id ? 'Edit Live' : 'Create New Live'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Title <span className='text-red-500'>*</span></Label>
                    <Input
                      id="title"
                      {...addEventDetail('title')}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Date <span className='text-red-500'>*</span></Label>
                    <Input
                      type='date'
                      id="liveDate"
                      {...addEventDetail('liveDate')}
                    />
                    {errors.liveDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.liveDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Time <span className='text-red-500'>*</span></Label>
                    <Input
                      type='time'
                      id="liveTime"
                      {...addEventDetail('liveTime')}
                    />
                    {errors.liveTime && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.liveTime.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Description</Label>
                    <TextArea
                      id="description"
                      rows={3}
                      {...addEventDetail('description')}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>URL <span className='text-red-500'>*</span></Label>
                    <Input
                      id="url"
                      {...addEventDetail('url')}
                    />
                    {errors.url && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.url.message}
                      </p>
                    )}
                  </div>

                  {/* <div className="flex gap-2">
                    <Button onClick={handleSaveSlide}>
                      <Save className="w-4 h-4 mr-2" />
                      {isEditing ? 'Update Slide' : 'Save Slide'}
                    </Button>
                    {isEditing && (
                      <Button variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
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
                  <Label>Image <span className='text-red-500'>*</span></Label>
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
                    {...addEventDetail('image', {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        addEventDetail('image').onChange(e);
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