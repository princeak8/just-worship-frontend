import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Placeholder from '@/public/photo1.png'
import useHome from './useAbout';
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

export default function EditAbout() {
  const {id} = useParams()
  const { formInstance, isLoading, onSubmit } = useHome()
  const { handleSubmit, addHeroDetail } = formInstance;

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);



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
          <h1 className="text-3xl font-bold mb-8">About Page Manager</h1>
          <Button type='submit' className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'><Save className="w-4 h-4" />{id ? 'Update' : 'Save'}</Button>
        </div>

        <div className="flex gap-8">
          <div className='w-8/12'>
            <Card>
              <CardHeader>
                <CardTitle>
                  {id ? 'Edit Section' : 'Create New Section'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Title <span className='text-red-500'>*</span></Label>
                    <Input
                      id="title"
                      {...addHeroDetail('title')}
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <TextArea
                      id="description"
                      rows={20}
                      {...addHeroDetail('description')}
                    />
                  </div>
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
                  <Label>Slide Image <span className='text-red-500'>*</span></Label>
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
                    {...addHeroDetail('image', {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        addHeroDetail('image').onChange(e);
                        handleFileChange(e);
                      },
                    })}
                  />

                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}