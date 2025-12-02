/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { motion } from "framer-motion";
import { useGetAboutQuery, useGetCurrentDiscipleshipQuery, useJoinDiscipleshipMutation, useGetTeamQuery } from '@/app/api';
import background from '@/public/live.jpeg'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import image1 from '@/public/live2.jpeg'
import image2 from '@/public/card2.jpeg'
import image3 from '@/public/card3.jpeg'
import image4 from '@/public/card4.jpeg'
import { Calendar, ConciergeBell, Search, Loader2, CheckCircle2, Users, MapPin, Clock } from 'lucide-react';
import SkeletonLoader from '@/SkeletonLoader';

import { useCountriesQuery } from '@/app/api';
import type { Discipleship as DiscipleshipType, Country } from '@/app/types';

interface JoinData {
  firstname: string,
  surname: string,
  email: string,
  phoneNumber: string,
  countryId?: number | null,
  city?: string | null
}


const Discipleship: React.FC = () => {

  interface GetCountry {
    data: Country[]
  }

  const [loader, setLoader] = useState(false)
  const [joiningSuccess, setJoiningSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<JoinData>();

  // const { data: live, isLoading } = useGetLiveQuery<LiveData | any | undefined>(undefined);
  const [joinDiscipleship, { isLoading: isJoining }] = useJoinDiscipleshipMutation();
  const { data: countries, isLoading: isLoadingCountries } = useCountriesQuery<GetCountry[] | any | undefined>(undefined);
  const { data: { data: discipleship } = {}, isLoading } = useGetCurrentDiscipleshipQuery<DiscipleshipType[] | any | undefined>(undefined);

  // if(!isLoading) console.log("discipleship:", discipleship);
  useEffect(() => {
    if (countries?.data && countries.data.length > 0) {
      setValue('countryId', 156);
    }
  }, [countries, setValue]);

  console.log("sss: ", discipleship);

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
    if (data?.countryId) formdata.append('countryId', data.countryId.toString());
    if (data?.city) formdata.append('city', data.city);

    setLoader(true)

    try {
      await joinDiscipleship({ formdata, id: discipleship.id }).unwrap();
      setJoiningSuccess(true);
      reset();
      setTimeout(() => { setJoiningSuccess(false); }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setLoader(false)
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      {isLoading && (
        <section className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-24'>
          <SkeletonLoader className={'w-full h-[30rem] border '} />
          <SkeletonLoader className={'w-full h-[30rem] border '} />
          <SkeletonLoader className={'w-full h-[30rem] border '} />
        </section>
      )}
      {!isLoading && (<>
        <motion.section
          className='w-full h-[70vh] flex items-end overflow-hidden relative'
          style={{ backgroundImage: `url(${discipleship?.photo?.url || '/default.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent'></div>
          <div className='container mx-auto px-4 pb-24 relative z-10'>
            <motion.div
              className='max-w-4xl'
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h1
                className="text-3xl lg:text-5xl font-bold mb-4 text-white"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {discipleship?.name}
              </motion.h1>

              {(discipleship?.venue || discipleship?.deadline) && (
                <div className="flex flex-wrap gap-4 mt-4 text-white/90">
                  {discipleship?.venue && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm lg:text-base">{discipleship.venue}</span>
                    </div>
                  )}
                  {discipleship?.deadline && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm lg:text-base">Deadline: {new Date(discipleship.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</span>
                    </div>
                  )}
                  {discipleship?.members && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm lg:text-base">{discipleship.members.length} Members</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {discipleship.length !== 0 ? (
          <section className='container mx-auto px-4 py-12 -mt-80 relative z-20'>
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden -mt-32">
                <div className="bg-[#BA833C] p-6">
                  <h2 className='text-2xl lg:text-3xl font-bold text-center text-white uppercase tracking-wide'>
                    Register for Discipleship Class
                  </h2>
                </div>

                <div className="p-6 lg:p-8">
                  {joiningSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-green-700 font-medium">
                        You have successfully registered for the discipleship class!
                      </span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register('firstname', { required: 'Firstname is required' })}
                          className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900 transition-all"
                          placeholder="John"
                        />
                        {errors.firstname && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register('surname', { required: 'Surname is required' })}
                          className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900 transition-all"
                          placeholder="Doe"
                        />
                        {errors.surname && (
                          <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900 transition-all"
                        placeholder="john.doe@example.com"
                        type='email'
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('phoneNumber', { required: 'Phone Number is required' })}
                        className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900 transition-all"
                        placeholder="+234 800 000 0000"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          id="countryId"
                          className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900 transition-all"
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register('city', { required: 'City is required' })}
                          className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA833C] focus:border-[#BA833C] text-gray-900 transition-all"
                          placeholder="Enugu"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 w-full">
                      {loader ? (
                        <motion.button
                          type="submit"
                          disabled
                          className="w-full md:w-auto px-8 py-3.5 bg-[#BA833C] text-white rounded-lg font-semibold flex items-center justify-center gap-2 min-w-[150px]"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Loader2 className='w-5 h-5 animate-spin' />
                          Registering...
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          className="w-full md:w-auto px-8 py-3.5 bg-[#BA833C] text-white rounded-lg font-semibold hover:bg-[#F8DA94] hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Register Now
                        </motion.button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </section>
        ) : (
          <section className="container mx-auto px-4 py-12">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Users className="w-8 h-8 text-gray-400" />
                </motion.div>

                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  No Discipleship Classes Available
                </motion.h3>

                <motion.p
                  className="text-gray-600 text-lg mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  We're currently between discipleship sessions. New classes will be announced soon.
                  Please check back later or join our newsletter to be notified when registration opens.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">New sessions coming soon</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>
        )}
      </>)}
    </div>
  );
};

export default Discipleship;