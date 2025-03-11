import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAboutQuery } from '@/app/api';

interface ItemData {
  data: Item[]
}

interface Item {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const defaultItems = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
  {
    id: '2',
    name: 'Smartwatch',
    price: 149.99,
    description: 'Modern smartwatch with multiple health tracking features.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
  {
    id: '3',
    name: 'Gaming Laptop',
    price: 1299.99,
    description: 'Powerful gaming laptop with high performance graphics.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
];

export default function StoreCMS() {
  const { data, isLoading } = useGetAboutQuery<ItemData[] | any | undefined>(undefined);
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<Item>>({});

  useEffect(() => {
    setItems(data?.data || defaultItems || []);
  }, [data]);

  const handleDeleteItem = (id?: string) => {
    if (!id) return;
    setItems(prev => prev.filter(item => item.id !== id));
    if (currentItem.id === id) setCurrentItem({});
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
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
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                        <p className="text-base text-gray-700">{item.description}</p>
                      </CardContent>
                      <div className="flex justify-between p-4">
                        <Button asChild size="sm" variant="outline">
                        <Link to={`/dashboard/cms/store/${item.id}`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Search className="mx-auto mb-4" />
                    <p>No events found</p>
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
