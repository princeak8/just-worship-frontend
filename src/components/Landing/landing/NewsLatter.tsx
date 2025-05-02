import { useSubscribeMutation } from "@/app/api"
import { useState } from "react"
import logo from '@/public/logo.png'
import { Loader2 } from "lucide-react"

export default function NewsLater() {
    const [subscribe, { isLoading: isLoading123 }] = useSubscribeMutation()
    const [subAlertModal, setSubAlertModal] = useState(false)
    const [email, setEmail] = useState('')


    const onSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            email,
        }
        try {
            await subscribe(data).unwrap()
            setSubAlertModal(true)
            setEmail('')
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            {subAlertModal && (
                <section className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center'>
                    <div className='rounded-lg bg-white p-6 shadow-xl transform transition-all max-w-md w-full mx-4'>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <img
                                src={logo}
                                className='w-16 mb-4 animate-scale-in'
                                alt="Success icon"
                            />
                            <h3 className='text-xl font-semibold text-gray-800'>
                                Welcome Aboard
                            </h3>
                            <p className='text-gray-600 mb-4'>
                                Thank you for subscribing to our weekly News Channel
                            </p>
                            <button
                                onClick={() => setSubAlertModal(false)}
                                className='w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </section>
            )}
            <div className="w-full p-10 bg-gradient-to-r from-[rgba(168,85,247,0.2)] via-[rgba(186,131,60,0.2)] to-[rgba(186,131,60,0.2)] backdrop-blur-lg">

                <section className="container space-y-4 lg:flex gap-6 items-center">
                    <div className="lg:w-3/12 flex flex-col">
                        <h2 className="font-semibold text-2xl">Subscribe to our newslater for more updates</h2>
                        <p className="text-sm">Get the latest resources, event dates, new music, books, merchandise and more directly into your inbox</p>
                    </div>
                    <div className="lg:w-9/12">
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 rounded-lg focus:outline-none" placeholder="Your Email..." />
                    </div>
                    <div className="lg:2/12">
                        {isLoading123 ? (
                            <button className="bg-black rounded-lg p-4 px-10 text-white cursor-wait">
                                <Loader2 className="animate-spin" />
                            </button>
                        ) : (
                            <button onClick={onSubscribe} className="bg-black rounded-lg p-4 px-10 text-white">Submit</button>
                        )}
                    </div>
                </section>
            </div>
        </>
    )
}
