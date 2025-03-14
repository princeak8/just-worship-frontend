import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Banknote, Edit, Loader2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetGivingQuery } from '@/app/api';

interface PaymentMethod {
    id: number;
    name: string;
}

export default function GivingCMS() {
    const { data, isLoading } = useGetGivingQuery<any | undefined>(undefined);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

    useEffect(() => {
        if (data?.data) {
            setPaymentMethods(data?.data);
        }
    }, [data?.data]);

    if(isLoading)return  <section className='w-full h-screen flex items-center justify-center'><Loader2 size={50} className='text-purple-500 animate-spin' /></section>

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="w-full mx-auto">
                <div className='flex items-center justify-between'>
                    <h1 className="text-3xl font-bold mb-8">Payment Methods Manager</h1>
                </div>
                    <section className='space-y-6'>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {paymentMethods.map((method) => (
                                <Card key={method.id}>
                                    <CardContent className="space-y-4 py-4">
                                        <div className="p-2 bg-white">
                                            <div className="flex gap-4 w-full items-center justify-between">
                                                <div className="flex flex-col justify-between w-full p-2">
                                                    <div>
                                                        <h3 className="flex items-center font-semibold text-2xl mb-2 gap-2">
                                                            <Banknote className='text-purple-500'/>
                                                            {method.name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 -mt-16">
                                                    <Link
                                                        to={`/dashboard/cms/giving/${method.id}`}
                                                        className='flex items-center rounded-md p-2 '
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        to={`/dashboard/cms/giving/${method.id}`}
                                                        className='flex items-center rounded-md text-red-500'
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
            </div>
        </div>
    );
}