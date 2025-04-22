import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Placeholder from '@/public/photo1.png';
import useStore from './useStore';
import { TextArea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function AddItem() {
  const { id } = useParams();
  const { formInstance, isLoading111, onSubmit, fetchedImage } = useStore();
  const { handleSubmit, addItemDetail } = formInstance;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if(fetchedImage){
      setPreviewImage(fetchedImage)
    }
  },[fetchedImage])

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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-8">Store Item Manager</h1>
          {isLoading111 ?(
            <Button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white">
              <Loader2 className='animate-spin'/>
            </Button>
          ):(
            <Button type="submit" className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white">
            <Save className="w-4 h-4" />
            {id ? 'Update Item' : 'Save Item'}
            </Button>
          )}
        </div>

        <div className="flex gap-8">
          <div className="w-8/12">
            <Card>
              <CardHeader>
                <CardTitle>
                  {id ? 'Edit Item' : 'New Item'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Item Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      {...addItemDetail('name')}
                    />
                  </div>

                  <div>
                    <Label>Price <span className="text-red-500">*</span></Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...addItemDetail('price')}
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <TextArea
                      id="description"
                      rows={3}
                      {...addItemDetail('description')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-4/12">
            <Card>
              <CardContent className="space-y-4 p-8">
                <div>
                  <Label>Image <span className="text-red-500">*</span></Label>
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
                    {...addItemDetail('image', {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        addItemDetail('image').onChange(e);
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
