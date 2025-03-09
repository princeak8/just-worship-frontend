import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const dummySlides = [
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    title: 'Columbia ready to work with Trump',
    description: "Columbia University appears to be ready and willing to work with President Donald Trump and his administration. The university’s interim president. Katrina Armstrong, issued a letter on Friday in response to the Trump administration cutting $400 million in federal grants to the school. Federal agencies that severed their ties with Columbia said it was because of the Ivy League institution’s continued inaction in the face of persistent harassment of Jewish students. Armstrong says in her letter that the funding cuts will immediately impact research and other critical functions, but she does not dismiss the Trump administration’s claims. Rather, Armstrong writes that the university takes the cuts very seriously and is prepared to work with the government on its legitimate concerns. Columbia University appears to be ready and willing to work with President Donald Trump and his administration. The university’s interim president. Katrina Armstrong, issued a letter on Friday in response to the Trump administration cutting $400 million in federal grants to the school. Federal agencies that severed their ties with Columbia said it was because of the Ivy League institution’s continued inaction in the face of persistent harassment of Jewish students. Armstrong says in her letter that the funding cuts will immediately impact research and other critical functions, but she does not dismiss the Trump administration’s claims. Rather, Armstrong writes that the university takes the cuts very seriously and is prepared to work with the government on its legitimate concerns.",
    button_text: 'text',
    button_link: "link"
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    title: 'Columbia ready to work with Trump',
    description: "Columbia University appears to be ready and willing to work with President Donald Trump and his administration. The university’s interim president. Katrina Armstrong, issued a letter on Friday in response to the Trump administration cutting $400 million in federal grants to the school. Federal agencies that severed their ties with Columbia said it was because of the Ivy League institution’s continued inaction in the face of persistent harassment of Jewish students.",
    button_text: 'text',
    button_link: "link"
  },
]

interface Slide {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function HomeCMS() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState<Partial<Slide>>({});

  useEffect(() => {
    localStorage.setItem('slides', JSON.stringify(slides));
  }, [slides]);


  const handleEditSlide = (slide: Slide) => {
    
  };

  const handleDeleteSlide = (id: string) => {
    setSlides(prev => prev.filter(slide => slide.id !== id));
    if (currentSlide.id === id) resetForm();
  };

  const resetForm = () => {
    setCurrentSlide({});
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="w-full mx-auto">
        <div className='flex items-center justify-between'>
        <h1 className="text-3xl font-bold mb-8">Home Page Slides Manager</h1>
        <Link to={'/dashboard/cms/home/create'} className='flex gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'><Plus /> Add</Link>
        </div>

        <div className="grid  gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Current Slides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {slides.length > 0 ?
                slides?.map(slide => (
                  <div key={slide.id} className="border w-full rounded-lg p-4 bg-white">
                    <div className="flex gap-4 w-full ">
                      <div className="flex flex-col justify-between w-8/12 p-2">
                      <div>
                        <h3 className="font-semibold mb-2">{slide.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-[9] text-justify">{slide.description}</p>
                        </div>
                        <div className="flex gap-2 mt-2 ">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditSlide(slide)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteSlide(slide.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className='w-4/12'>
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full object-cover rounded"
                      />
                      </div>
                    </div>
                  </div>
                )):(
                  <p className='flex gap-2'><Search /> No slide available...</p>
                )
              }
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}