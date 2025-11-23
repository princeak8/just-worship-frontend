import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeleteGalleryImageMutation, useGetGalleryQuery } from '@/app/api';

interface StockData {
  data: Stock[]
}

interface Event {
  id: string;
  name: string;
  date: string;
  bookings: string;
  content: string;
  location: string;
  year: string;
  coverPhoto: {
    url: string;
  }
}

interface Stock {
  id?: string;
  title: string;
  event: Event;
  photo: {
    url: string;
  }
}

interface Select {
  title: string,
  id: string | undefined
}

export default function GalleryCMS() {
  const [perPage] = useState(100)
  const { data, isLoading } = useGetGalleryQuery<StockData[] | any | undefined>({ perPage });
  const [Gallery, setGallery] = useState([])
  const [deleteGalleryImage] = useDeleteGalleryImageMutation()
  const [items, setItems] = useState<Stock[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<Stock>>({});
  const [warning, setWarning] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Select>({
    title: '',
    id: ''
  })

  useEffect(() => {
    setItems(data?.data || []);
  }, [data]);

  const handleDeleteMember = async (id?: string) => {
    if (!id) return;
    try {
      await deleteGalleryImage(id).unwrap()
      setItems(prev => prev.filter(member => member.id !== id));
      setWarning(false);
      setSelectedItem({ title: '', id: '' });
    } catch (err) {
      console.log(err)
    }
  };

  if (isLoading) return <div className='w-full h-screen flex items-center justify-center'><Loader2 size={50} className='text-[#BA833C] animate-spin' /></div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {warning && (
        <section className=' fixed w-full h-screen inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center'>
          <div className='w-[25em] bg-white rounded-md border border-yellow-500 overflow-hidden p-4 text-center space-y-4'>
            <p>Are you sure you want to remove &apos;<span className='italic font-bold text-red-700'>{selectedItem?.title || "member"}</span>&apos; from gallery?</p>
            <div className='flex items-center justify-between'>
              <Button size={'sm'} onClick={() => { setWarning(false); setCurrentItem({ title: '', id: '' }) }} variant={'default'} >Cancel</Button>
              <Button size={'sm'} onClick={() => handleDeleteMember(selectedItem.id)} variant={'destructive'} >Delete</Button>
            </div>
          </div>
        </section>
      )}
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-8">Gallery Page Manager</h1>
          <Link
            to={'/dashboard/cms/gallery/add'}
            className="flex gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white"
          >
            <Plus /> Add Item
          </Link>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardContent className="space-y-4 py-4">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items?.length > 0 ? (
                  items.map((item) => (
                    <Card key={item.id}>
                      <img
                        loading="lazy"
                        src={item.photo.url}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="">
                        <p className="text-base text-gray-700 line-clamp-2">{item?.event?.name}</p>
                      </CardContent>
                      <div className="flex justify-between p-4">
                        <Button asChild size="sm" variant="default">
                          <Link to={`/dashboard/cms/gallery/${item.id}`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button size="sm" onClick={() => { setWarning(true); setSelectedItem({ title: item.title, id: item.id }) }} variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Search className="mx-auto mb-4" />
                    <p>No stock found</p>
                  </div>
                )}
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
