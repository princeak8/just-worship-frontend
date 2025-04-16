import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Placeholder from '@/public/photo1.png';
import useHome from './useAbout';
import { TextArea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function EditAbout() {
  const { id } = useParams();
  const { formInstance, isLoading, onSubmit, fetchedImage } = useHome();
  const { handleSubmit, addHeroDetail } = formInstance;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(()=>{
    if(fetchedImage){
      setPreviewImage(fetchedImage)
    }
  },[fetchedImage])


  // const handleFileChange = (field: keyof typeof previews) => 
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setPreviews(prev => ({ ...prev, [field]: reader.result as string }));
  //       };
  //       reader.readAsDataURL(file);
  //       addHeroDetail(`${field}Photo`).onChange(file);
  //     }
  //   };

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
        <div className='flex items-center justify-between mb-8'>
          <h1 className="text-3xl font-bold">Edit About Page</h1>
          <Button type='submit' className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'>
            <Save className="w-4 h-4" />{id ? 'Update' : 'Save'}
          </Button>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Main Header</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Header Text <span className='text-red-500'>*</span></Label>
                  <Input
                    {...addHeroDetail('header')}
                    placeholder="Main page header"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Detailed Content <span className='text-red-500'>*</span></Label>
                <TextArea
                  {...addHeroDetail('content')}
                  rows={8}
                  placeholder="Detailed about content"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vision Section</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="space-y-4">
                <div>
                  <Label>Vision Text <span className='text-red-500'>*</span></Label>
                  <TextArea
                    {...addHeroDetail('vision')}
                    rows={4}
                    placeholder="Our vision statement"
                  />
                </div>
                {/* <div>
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
                </div>  */}
              </div>
              {/* <div className="flex justify-center">
                <img
                  src={previews.vision || Placeholder}
                  alt="Vision preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mission Section</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="space-y-4">
                <div>
                  <Label>Mission Text <span className='text-red-500'>*</span></Label>
                  <TextArea
                    {...addHeroDetail('mission')}
                    rows={4}
                    placeholder="Our mission statement"
                  />
                </div>
                {/* <div>
                  <Label>Mission Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange('mission')}
                  />
                </div> */}
              </div>
              {/* <div className="flex justify-center">
                <img
                  src={previews.mission || Placeholder}
                  alt="Mission preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pastor Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label>Pastor Title <span className='text-red-500'>*</span></Label>
                  <Input
                    {...addHeroDetail('pastorTitle')}
                    placeholder="Head Pastor"
                  />
                </div>
                <div>
                  <Label>Pastor Bio <span className='text-red-500'>*</span></Label>
                  <TextArea
                    {...addHeroDetail('pastorBio')}
                    rows={8}
                    placeholder="Pastor's biography"
                  />
                </div>
               
              </div>
              <div className="justify-center">
                <Label>Pastor Photo</Label>
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
    </form>
  );
}