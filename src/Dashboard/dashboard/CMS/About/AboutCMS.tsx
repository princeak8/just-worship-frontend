import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAboutQuery } from '@/app/api';


interface AboutSection {
    id: string;
    vision: string;
    visionPhoto:{
    url: string;
    }
    mission?: string;
    missionPhoto:{
        url: string;
        }
}

export default function AboutCMS() {
    const { data, isLoading } = useGetAboutQuery<AboutSection | any | undefined>(undefined);
    const [aboutSections, setAboutSections] = useState<AboutSection | null>(null);

    // console.log("data: ", data)

    useEffect(() => {
        setAboutSections(data?.data);
    }, [data]);


    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="w-full mx-auto">
                <div className='flex items-center justify-between'>
                    <h1 className="text-3xl font-bold mb-8">About Page Manager</h1>
                </div>

                {isLoading ? (
                    <section className='w-full h-screen flex items-center justify-center'>
                        <Loader2 size={50} className='text-purple-500 animate-spin' />
                    </section>
                ):(

                <section className='space-y-6'>

                <div className="grid gap-8">
                    <Card>
                        <CardContent className="space-y-4 py-4">
                            
                                <div className="border w-full rounded-lg p-4 bg-white">
                                    <div className="flex gap-4 w-full">
                                        <div className="flex flex-col justify-between w-full p-2">
                                            <div>
                                                <h3 className="font-semibold text-xl mb-2">Who we are</h3>
                                                <p className="text-sm text-gray-600 text-justify">
                                                    {aboutSections?.vision}
                                                </p>
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <Link
                                                    to={`/dashboard/cms/about/${aboutSections?.id}`}
                                                    className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>

                                        {aboutSections?.visionPhoto && (
                                            <div className='w-5/12'>
                                                <img
                                                    src={aboutSections?.visionPhoto?.url}
                                                    alt={'Who we are'}
                                                    className="w-full h-60 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8">
                    <Card>
                        <CardContent className="space-y-4 py-4">
                                <div className="border w-full rounded-lg p-4 bg-white">
                                    <div className="flex gap-4 w-full">
                                        <div className="flex flex-col justify-between w-full p-2">
                                            <div>
                                                <h3 className="font-semibold text-xl mb-2">Our Mission</h3>
                                                <p className="text-sm text-gray-600 text-justify">
                                                    {aboutSections?.mission}
                                                </p>
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <Link
                                                    to={`/dashboard/cms/about/${aboutSections?.id}`}
                                                    className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>

                                        {aboutSections?.missionPhoto && (
                                            <div className='w-5/12'>
                                                <img
                                                    src={aboutSections?.missionPhoto?.url}
                                                    alt={"Our mission"}
                                                    className="w-full h-60 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                        </CardContent>
                    </Card>
                </div>
                </section>

                )}

            </div>
        </div>
    );
}