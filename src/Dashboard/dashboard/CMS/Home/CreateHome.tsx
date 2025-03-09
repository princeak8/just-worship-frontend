import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import Placeholder from '@/public/photo1.png'

interface Slide {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function CreateHome() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState<Partial<Slide>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const savedSlides = localStorage.getItem('slides');
    if (savedSlides) {
      setSlides(JSON.parse(savedSlides));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('slides', JSON.stringify(slides));
  }, [slides]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setCurrentSlide(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentSlide(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSlide = () => {
    if (!currentSlide.image || !currentSlide.title) {
      alert('Please fill in required fields: Image and Title');
      return;
    }

    const newSlide: Slide = {
      id: currentSlide.id || Date.now().toString(),
      image: currentSlide.image,
      title: currentSlide.title,
      description: currentSlide.description || '',
      buttonText: currentSlide.buttonText || 'Learn More',
      buttonLink: currentSlide.buttonLink || '#',
    };

    if (isEditing) {
      setSlides(prev => prev.map(slide => 
        slide.id === currentSlide.id ? newSlide : slide
      ));
    } else {
      setSlides(prev => [...prev, newSlide]);
    }

    resetForm();
  };

  const handleEditSlide = (slide: Slide) => {
    setCurrentSlide(slide);
    setPreviewImage(slide.image);
    setIsEditing(true);
  };

  const handleDeleteSlide = (id: string) => {
    setSlides(prev => prev.filter(slide => slide.id !== id));
    if (currentSlide.id === id) resetForm();
  };

  const resetForm = () => {
    setCurrentSlide({});
    setPreviewImage(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className='flex items-center justify-between'>
        <h1 className="text-3xl font-bold mb-8">Home Page Slides Manager</h1>
        <Link to={'/dashboard/cms/home/create'} className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'><Save className="w-4 h-4 mr-2" /> Save</Link>
        </div>

        <div className="flex gap-8">
          <div className='w-8/12'>
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEditing ? 'Edit Slide' : 'Create New Slide'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Slide Title *</Label>
                    <Input
                      name="title"
                      value={currentSlide.title || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Slide Description</Label>
                    <Input
                      name="description"
                      value={currentSlide.description || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Button Text</Label>
                    <Input
                      name="buttonText"
                      value={currentSlide.buttonText || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Button Link</Label>
                    <Input
                      name="buttonLink"
                      value={currentSlide.buttonLink || ''}
                      onChange={handleInputChange}
                    />
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
                <CardTitle>Current Slides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              <div>
                    <Label>Slide Image *</Label>
                      <img
                        src={previewImage || Placeholder}
                        alt="Preview"
                        className="mt-2 w-full h-48 object-cover rounded"
                      />
                    <Input 
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-1"
                    />
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}