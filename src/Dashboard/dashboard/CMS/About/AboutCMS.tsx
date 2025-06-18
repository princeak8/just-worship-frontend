import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAboutQuery, useGetYoutubeQuery } from '@/app/api';

interface AboutSection {
  id: number;
  header: string;
  content: string;
  pastorTitle: string;
  pastorBio: string;
  pastorPhoto?: {
    id: number;
    url: string;
    mimeType: string;
    filename: string;
    extension: string;
    size: number;
  };
  vision: string;
  visionPhoto?: {
    id: number;
    url: string;
    mimeType: string;
    filename: string;
    extension: string;
    size: number;
  };
  mission: string;
  missionPhoto?: {
    id: number;
    url: string;
    mimeType: string;
    filename: string;
    extension: string;
    size: number;
  };
}

interface ApiResponse {
  statusCode: number;
  data: AboutSection;
}

interface Youtube {
  title: string;
  url: string
}

export default function AboutCMS() {
  const { data, isLoading } = useGetAboutQuery<ApiResponse | any>(undefined);
  const { data: Youtube, isLoading: load } = useGetYoutubeQuery<ApiResponse | any>(undefined);
  const [aboutSections, setAboutSections] = useState<AboutSection | null>(null);
  const [youtube, setYoutube] = useState<Youtube | null>(null)

  useEffect(() => {
    if (data) {
      setAboutSections(data?.data);
      setYoutube(Youtube?.data)
    }
  }, [data, Youtube]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="w-full mx-auto">
        <div className='flex items-center justify-between mb-8'>
          <h1 className="text-3xl font-bold">About Page Manager</h1>
          <Link
            to={`/dashboard/cms/about/${aboutSections?.id}`}
            className="bg-[#BA833C] text-white px-4 py-2 rounded-md hover:bg-[#F8DA94] hover:text-black flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit About
          </Link>
        </div>

        {isLoading ? (
          <section className='w-full h-screen flex items-center justify-center'>
            <Loader2 size={50} className='text-[#BA833C] animate-spin' />
          </section>
        ) : (
          <section className='space-y-8'>

            <Card>
              <CardContent className="py-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Main Header</h2>
                  <p className="text-gray-600 text-justify">
                    {aboutSections?.header}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">About Content</h2>
                  <p className="text-gray-600 text-justify whitespace-pre-line">
                    {aboutSections?.content}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-6">
                <div className="flex gap-6">
                  <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-semibold">Our Vision</h2>
                    <p className="text-gray-600 text-justify">
                      {aboutSections?.vision}
                    </p>
                  </div>
                  {/* {aboutSections?.visionPhoto && (
                    <div className="w-1/3">
                      <img
                        src={aboutSections.visionPhoto.url}
                        alt="Vision"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )} */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-6">
                <div className="flex gap-6">
                  <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-semibold">Our Mission</h2>
                    <p className="text-gray-600 text-justify">
                      {aboutSections?.mission}
                    </p>
                  </div>
                  {/* {aboutSections?.missionPhoto && (
                    <div className="w-1/3">
                      <img
                        src={aboutSections.missionPhoto.url}
                        alt="Mission"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )} */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-6">
                <div className="flex gap-6">
                  <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-semibold">{aboutSections?.pastorTitle}</h2>
                    <p className="text-gray-600 text-justify whitespace-pre-line">
                      {aboutSections?.pastorBio}
                    </p>
                  </div>
                  {aboutSections?.pastorPhoto && (
                    <div className="w-1/3 ">
                      <img
                        loading="lazy"
                        src={aboutSections?.pastorPhoto?.url}
                        alt="Pastor"
                        className="w-full object-cover object-top rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-6">
                <div className="flex gap-6">
                  <div className="flex-1 space-y-4">
                    <p className="text-gray-600 text-justify whitespace-pre-line h-[50rem]">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/XJPJLWdFlY8?si=S_w9g_iuNcfepH62"
                        title="Introductory Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className='w-full h-full object-cover'
                      />
                    </p>
                    <section className='flex items-center justify-between'>
                      <div className='grid'>
                        <p className='text-xl font-semibold'>Title:</p>
                        <p className="text-gray-600 text-justify whitespace-pre-line">{youtube?.title || "-no title provided-"}</p>
                      </div>

                      <Link
                        to={`/dashboard/cms/edit_youtube`}
                        className="bg-[#BA833C] text-white px-4 py-2 rounded-md hover:bg-[#F8DA94] hover:text-black flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Video
                      </Link>
                    </section>
                  </div>
                </div>
              </CardContent>
            </Card>

          </section>
        )}
      </div>
    </div>
  );
}