import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeleteHeroDetailsMutation, useGetHeroQuery } from '@/app/api';

// export const dummySlides = [
//   {
//     image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
//     title: 'Columbia ready to work with Trump',
//     description: "Columbia University appears to be ready and willing to work with President Donald Trump and his administration. The university’s interim president. Katrina Armstrong, issued a letter on Friday in response to the Trump administration cutting $400 million in federal grants to the school. Federal agencies that severed their ties with Columbia said it was because of the Ivy League institution’s continued inaction in the face of persistent harassment of Jewish students. Armstrong says in her letter that the funding cuts will immediately impact research and other critical functions, but she does not dismiss the Trump administration’s claims. Rather, Armstrong writes that the university takes the cuts very seriously and is prepared to work with the government on its legitimate concerns. Columbia University appears to be ready and willing to work with President Donald Trump and his administration. The university’s interim president. Katrina Armstrong, issued a letter on Friday in response to the Trump administration cutting $400 million in federal grants to the school. Federal agencies that severed their ties with Columbia said it was because of the Ivy League institution’s continued inaction in the face of persistent harassment of Jewish students. Armstrong says in her letter that the funding cuts will immediately impact research and other critical functions, but she does not dismiss the Trump administration’s claims. Rather, Armstrong writes that the university takes the cuts very seriously and is prepared to work with the government on its legitimate concerns.",
//     button_text: 'text',
//     button_link: "link"
//   },
//   {
//     image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
//     title: 'Columbia ready to work with Trump',
//     description: "Columbia University appears to be ready and willing to work with President Donald Trump and his administration. The university’s interim president. Katrina Armstrong, issued a letter on Friday in response to the Trump administration cutting $400 million in federal grants to the school. Federal agencies that severed their ties with Columbia said it was because of the Ivy League institution’s continued inaction in the face of persistent harassment of Jewish students.",
//     button_text: 'text',
//     button_link: "link"
//   },
// ]

interface SlideData {
  data: Slide[]
}

interface Slide {
  id: string;
  photo: {
    url: string;
  }
  title: string;
  message: string;
  buttonText: string;
  button_link: string;
}

interface Select {
  title: string,
  id: string | undefined
}

export default function HomeCMS() {

  const { data, isLoading } = useGetHeroQuery<SlideData[] | any | undefined>(undefined)
  const [deleteHeroDetails] = useDeleteHeroDetailsMutation()
  const [slides, setSlides] = useState<Slide[] | any>([]);
  const [currentSlide, setCurrentSlide] = useState<Partial<Slide>>({});
  const [warning, setWarning] = useState(false)
  const [selectedSlide, setSelectedSlide] = useState<Select>({
    title: '',
    id: ''
  })

  // console.log("data: ", data)

  useEffect(() => {
    setSlides(data?.data)
  }, [data]);


  const handleDeleteSlide = async (id?: string) => {
    if (!id) return;
    try {
      await deleteHeroDetails(id).unwrap()
      setSlides((prev: any) => prev.filter((slide: any) => slide.id !== id));
      setWarning(false);
      setSelectedSlide({ title: '', id: '' });
    } catch (err) {
      console.log(err)
    }
  };

  const resetForm = () => {
    setCurrentSlide({});
  };

  if (isLoading) return <div className='w-full h-screen flex items-center justify-center'><Loader2 size={50} className='text-[#BA833C] animate-spin' /></div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {warning && (
        <section className=' fixed w-full h-screen inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center'>
          <div className='w-[25em] bg-white rounded-md border border-yellow-500 overflow-hidden p-4 text-center space-y-4'>
            <p>Are you sure you want to delete &apos;<span className='italic font-bold text-red-700'>{selectedSlide?.title || "slide"}</span>&apos;?</p>
            <div className='flex items-center justify-between'>
              <Button size={'sm'} onClick={() => { setWarning(false); setSelectedSlide({ title: '', id: '' }) }} variant={'default'} >Cancel</Button>
              <Button size={'sm'} onClick={() => handleDeleteSlide(selectedSlide.id)} variant={'destructive'} >Delete</Button>
            </div>
          </div>
        </section>
      )}
      <div className="w-full mx-auto">
        <div className='flex items-center justify-between'>
          <h1 className="text-3xl font-bold mb-8">Home Page Slides Manager</h1>
          <Link to={'/dashboard/cms/home/create'} className='flex gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white'><Plus /> Add Slide</Link>
        </div>

        <div className="grid  gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Current Slides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {slides?.length > 0 ?
                  slides?.map((slide: any) => (
                    <div key={slide.id} className="border w-full rounded-lg p-4 bg-white">
                      <div className="flex gap-4 w-full ">
                        <div className="flex flex-col justify-between w-8/12 p-2">
                          <div className='space-y-4'>
                            <h3 className="font-semibold mb-2">{slide?.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-[9] text-justify">{slide?.message}</p>
                            {slide?.buttonUrl && <a href={slide?.buttonUrl} ><button className="bg-gray-900 p-2 px-4 my-4 rounded-lg text-white text-sm text-gray-600 text-justify" >{slide?.buttonText}</button></a>}
                          </div>
                          <div className="flex gap-2 mt-2 ">
                            <Button asChild size="sm" variant="default">
                              <Link
                                to={`/dashboard/cms/home/${slide.id}`}
                                className='w-20 p-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md '
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </Button>
                            <Button size="sm" onClick={() => { setWarning(true); setSelectedSlide({ title: slide.title, id: slide.id }) }} variant="destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className='w-4/12'>
                          <img
                            src={slide?.photo?.url}
                            alt={slide.title}
                            className="w-full h-60 object-cover rounded"
                          />
                        </div>
                      </div>
                    </div>
                  )) : (
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