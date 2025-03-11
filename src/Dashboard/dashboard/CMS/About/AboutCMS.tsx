import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAboutQuery } from '@/app/api';


interface AboutSection {
    id: string;
    title: string;
    subtitle?: string;
    content: string;
    image?: string;
}


export const dummyAboutContent =
    {
        id: '1',
        title: 'About us',
        subtitle: 'Dedicated to excellence in education',
        content: "At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development",
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    }

export const dummyMissionContent = 
    {
        id: '1',
        title: 'Our Mission',
        subtitle: 'Dedicated to excellence in education',
        content: "At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development. At our institution, we are committed to fostering intellectual growth and personal development",
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    }

export default function AboutCMS() {
    const { data, isLoading } = useGetAboutQuery<AboutSection | any | undefined>(undefined);
    const [aboutSections, setAboutSections] = useState<AboutSection | null>(null);
    const [missionSections, setMissionSections] = useState<AboutSection | null>(null);

    useEffect(() => {
        setAboutSections(data || dummyAboutContent);
        setMissionSections(data || dummyMissionContent);
    }, [data]);


    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="w-full mx-auto">
                <div className='flex items-center justify-between'>
                    <h1 className="text-3xl font-bold mb-8">About Page Manager</h1>
                </div>

                <section className='space-y-6'>

                <div className="grid gap-8">
                    <Card>
                        <CardContent className="space-y-4 py-4">
                            
                                <div className="border w-full rounded-lg p-4 bg-white">
                                    <div className="flex gap-4 w-full">
                                        <div className="flex flex-col justify-between w-full p-2">
                                            <div>
                                                <h3 className="font-semibold text-xl mb-2">{aboutSections?.title}</h3>
                                                <p className="text-sm text-gray-600 text-justify">
                                                    {aboutSections?.content}
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

                                        {aboutSections?.image && (
                                            <div className='w-5/12'>
                                                <img
                                                    src={aboutSections?.image}
                                                    alt={aboutSections?.title}
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
                                                <h3 className="font-semibold text-xl mb-2">{missionSections?.title}</h3>
                                                <p className="text-sm text-gray-600 text-justify">
                                                    {missionSections?.content}
                                                </p>
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <Link
                                                    to={`/dashboard/cms/about/${missionSections?.id}`}
                                                    className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>

                                        {missionSections?.image && (
                                            <div className='w-5/12'>
                                                <img
                                                    src={missionSections?.image}
                                                    alt={missionSections?.title}
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
            </div>
        </div>
    );
}