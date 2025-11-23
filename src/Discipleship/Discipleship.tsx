/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { motion } from "framer-motion";
import { useGetAboutQuery, useGetCurrentDiscipleshipQuery, useJoinDiscipleshipMutation, useGetTeamQuery } from '@/app/api';
import background from '../public/live.jpeg'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import image1 from '@/public/live2.jpeg'
import image2 from '@/public/card2.jpeg'
import image3 from '@/public/card3.jpeg'
import image4 from '@/public/card4.jpeg'
import { Calendar, ConciergeBell, Search, Loader2 } from 'lucide-react';
import SkeletonLoader from '@/SkeletonLoader';

import { useCountriesQuery } from '@/app/api';
import type { Discipleship as DiscipleshipType, Country } from '@/app/types';

interface JoinData {
    firstname : string,
    surname : string,
    email : string,
    phoneNumber : string,
    countryId? : number | null,
    city? : string | null
}


const Discipleship: React.FC = () => {

  interface GetCountry {
    data: Country[]
  }

  const [loader, setLoader] = useState(false)
  const [joiningSuccess, setJoiningSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<JoinData>();

  // const { data: live, isLoading } = useGetLiveQuery<LiveData | any | undefined>(undefined);
  const [joinDiscipleship, {isLoading: isJoining}] = useJoinDiscipleshipMutation();
  const { data:countries, isLoading: isLoadingCountries } = useCountriesQuery<GetCountry[] | any | undefined>(undefined);
  const { data: {data: discipleship} = {}, isLoading } = useGetCurrentDiscipleshipQuery<DiscipleshipType[] | any | undefined>(undefined);

  // if(!isLoading) console.log("discipleship:", discipleship);
  useEffect(() => {
    if (countries?.data && countries.data.length > 0) {
      // Set default value using react-hook-form
      setValue('countryId', 156);
      // setValue('countryId', countries.data[0].id); 
    }
  }, [countries, setValue]);

  const onSubmit = async (data: JoinData) => {
    if (!discipleship) {
      alert('No discipleship.');
      return;
    }

    const formdata = new FormData();
    formdata.append('firstname', data.firstname);
    formdata.append('surname', data.surname);
    formdata.append('email', data.email);
    formdata.append('phoneNumber', data.phoneNumber);
    if(data?.countryId) formdata.append('countryId', data.countryId.toString());
    if(data?.city) formdata.append('city', data.city);

    setLoader(true)

    try {
      await joinDiscipleship({formdata, id: discipleship.id}).unwrap();
      setJoiningSuccess(true);
      reset();
      setTimeout(() => { setJoiningSuccess(false);  }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setLoader(false)
    }
  };

  return (
    <div className='bg-white min-h-screen pt-[10vh] px-40'>
        {isLoading && (
              <section className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                <SkeletonLoader className={'w-full h-[30rem] border '} />
                <SkeletonLoader className={'w-full h-[30rem] border '} />
                <SkeletonLoader className={'w-full h-[30rem] border '} />
              </section>
            )}
        <h1 className='text-2xl font-extrabold'> Discipleship Class </h1>
        {!isLoading && (<>
          <p className='font-bold'>
            { discipleship.name}
          </p>
          <div className='mb-10'>
              <img src={'/default.jpg'} className='h-[70vh]' />

              <h2 className='text-xl font-bold mt-8'> Register </h2>

              {joiningSuccess && <p className='py-4 text-green-600 font-bold'>You have registered Successfully to the discipleship Class</p>}

              {/* <div className='w-[80%]'> */}
              <form onSubmit={handleSubmit(onSubmit)} className='w-[80%]'>
                  <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">FirstName</label>
                      <input
                        {...register('firstname', { required: 'Firstname is required' })}
                        className="w-full bg-[#f4f4f1] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-800"
                        placeholder="John"
                      />
                      {errors.firstname && <p className="text-red-500 text-sm mt-2">{errors.firstname.message}</p>}
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">SurName</label>
                      <input
                        {...register('surname', { required: 'Surname is required' })}
                        className="w-full bg-[#f4f4f1] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900"
                        placeholder="Doe"
                      />
                      {errors.surname && <p className="text-red-500 text-sm mt-2">{errors.surname.message}</p>}
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <input
                        {...register('email', { required: 'Email is required' })}
                        className="w-full bg-[#f4f4f1] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900"
                        placeholder="john@gmail.com"
                        type='email'
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                      <input
                        {...register('phoneNumber', { required: 'Phone Number is required' })}
                        className="w-full bg-[#f4f4f1] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900"
                        placeholder="Doe"
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-sm mt-2">{errors.phoneNumber.message}</p>}
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                      <select id="countryId" className="w-full border rounded p-2 mt-1 bg-white text-black" 
                        // value='156'
                        {...register('countryId')}
                      >
                        <option value="">Select Country</option>
                        {countries?.data?.map((country: Country) => (
                          <option key={country.id} value={country.id.toString()}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                      <input
                        {...register('city', { required: 'City is required' })}
                        className="w-full bg-[#f4f4f1] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900"
                        placeholder="Enugu"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-2">{errors.city.message}</p>}
                  </div>

                  {loader ? (
                  <motion.button
                    type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Loader2 className='animate-spin' />
                  </motion.button>
                ) : (

                  <motion.button
                    type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-[#BA833C] text-white rounded-lg hover:text-black hover:bg-[#F8DA94] transition-colors"
                  >
                    Register
                  </motion.button>
                )}

              </form>
          </div>
      </>)}
    </div>
  );
};

export default Discipleship;