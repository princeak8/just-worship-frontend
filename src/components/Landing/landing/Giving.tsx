import card1 from '../../../public/card1.jpeg'
export default function Giving() {
    const Options = ['Partnership', 'Tithe & Offering', 'Donations']
    const Payments = ['Debit Card', 'Credit Card', 'Bank Transfer']
    return (
        <div className="w-full p-10">
            <section className="container space-y-4">
                <section className='w-full '>
                <div className="leading-10 text-center flex flex-col items-center justify-center my-10">
                        <h2 className="text-4xl uppercase">Giving</h2>
                        <p className='w-5/12'>
                          Be a part in advancing the kingdom of Heaven.
                        </p>
                    </div>
                    <div className='grid grid-cols-2 gap-10 text-justify leading-10'>
                        <div className='overflow-hidden h-full rounded-lg'>
                            <img src={card1} alt='Introductory video' className='h-full '/>
                        </div>
                        <div className='space-y-12 leading-12'>
                            <div className='text-center leading-12 sace-y-8'>
                                <h1 className='font-semibold text-center text-2xl my-4'>Choose an option</h1>
                                <div className='grid grid-cols-3 shadow text-center border border-gray-500 rounded-lg gap-2 overflow-hidden'>
                                    {Options.map((option, index) =>(
                                        <p key={index} className='bg-gray-300 hover:bg-gray-400 p-1'>{option}</p>
                                    ))}
                                </div>
                                <p>Nisl dolor sit amet eget tristique adipiscing tellus tristique</p>
                            </div>
                            <div className='text-center leading-12 sace-y-8'>
                                <h1 className='font-semibold text-center text-2xl my-4'>Choose how you want to give</h1>
                                <div className='grid grid-cols-3 shadow text-center border border-gray-500 rounded-lg gap-2 overflow-hidden'>
                                    {Payments.map((option, index) =>(
                                        <p key={index} className='bg-gray-300 hover:bg-gray-400 p-1'>{option}</p>
                                    ))}
                                </div>
                                <p>Nisl dolor sit amet eget tristique adipiscing tellus tristique</p>
                            </div>
                            <div className='text-center leading-12 sace-y-8'>
                                <h1 className='font-semibold text-center text-2xl my-4'>Enter an Amount</h1>
                                <div className='shadow text-center border border-gray-500 rounded-lg gap-2 overflow-hidden'>
                                    <input type='text' className='w-full focus:outline-none bg-transparent border border-gray-500 p-1'/>
                                </div>
                                <p>Nisl dolor sit amet eget tristique adipiscing tellus tristique</p>
                            </div>
                            <button className='w-full bg-gray-300 hover:bg-gray-500 rounded-lg p-2 font-bold mt-60'>Give now</button>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}
