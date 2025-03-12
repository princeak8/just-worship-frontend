import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {  useDeleteStockMutation, useGetStockQuery } from '@/app/api';

interface StockData {
  data: Stock[]
}

interface Stock {
  id?: string;
  name: string;
  price: number;
  description: string;
  coverPhoto:{
    url: string;
  } 
}

interface Select{
  name: string,
  id: string | undefined
}

export default function StoreCMS() {
  const { data, isLoading } = useGetStockQuery<StockData[] | any | undefined>(undefined);
  const [deleteItem] = useDeleteStockMutation()
  const [items, setItems] = useState<Stock[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<Stock>>({});
  const [warning, setWarning] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Select>({
      name: '',
      id: ''
    })

  useEffect(() => {
    setItems(data?.data || []);
  }, [data]);

  const handleDeleteMember = async (id?: string) => {
    if (!id) return;
    try{
      await deleteItem(id).unwrap()
      setItems(prev => prev.filter(member => member.id !== id));
      setWarning(false); 
      setSelectedItem({name: '', id: ''});
    }catch(err){
      console.log(err)
    }
  };

  if (isLoading) return <div className='w-full h-screen flex items-center justify-center'><Loader2 size={50} className='text-purple-500 animate-spin' /></div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
       {warning && (
        <section className=' fixed w-full h-screen inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center'>
          <div className='w-[25em] bg-white rounded-md border border-yellow-500 overflow-hidden p-4 text-center space-y-4'>
            <p>Are you sure you want to remove &apos;<span className='italic font-bold text-red-700'>{selectedItem?.name || "member"}</span>&apos; from stock?</p>
            <div className='flex items-center justify-between'> 
              <Button size={'sm'} onClick={() =>{setWarning(false); setCurrentItem({name: '', id: ''})}} variant={'default'} >Cancel</Button>
              <Button size={'sm'} onClick={() => handleDeleteMember(selectedItem.id)} variant={'destructive'} >Delete</Button>
            </div>
          </div>
        </section>
      )}
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-8">Store Page Manager</h1>
          <Link 
            to={'/dashboard/cms/store/add'} 
            className="flex gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white"
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
                        src={item.coverPhoto.url}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="">
                        <p className="text-sm text-gray-500">₦{Number(item.price).toLocaleString()}</p>
                        <p className="text-base text-gray-700 line-clamp-2">{item.description}</p>
                      </CardContent>
                      <div className="flex justify-between p-4">
                        <Button asChild size="sm" variant="default">
                        <Link to={`/dashboard/cms/store/${item.id}`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button size="sm" onClick={()=>{setWarning(true); setSelectedItem({name: item.name, id: item.id})}} variant="destructive">
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
