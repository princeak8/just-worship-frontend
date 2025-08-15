import type React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Banknote, ChevronDown, ChevronLeft, CreditCard, InfoIcon, Search } from 'lucide-react';
import type { BankAccount } from '@/Types';
import { useBankAccountsQuery } from '@/app/api';
import { BankAccountType } from '@/Enums/Giving';

const BankAccounts: React.FC = () => {

    type BankAccountRes = {
        data: BankAccount[];
        // maybe other meta fields...
      };

    //   const { data: { data: accounts = [] } = {}, isLoading } = useBankAccountsQuery<BankAccountRes>();
      const { data: { data: accounts = [] } = {}, isLoading: load } = useBankAccountsQuery<BankAccount[] | any | undefined>(undefined);

    return (
        <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Bank Accounts {/* Bank Transfer Instructions */}
                        </h1>

                        {/* {selected?.accounts?.length > 0 ? ( */}
                        {accounts?.length > 0 ? (
                        <div className='flex flex-row'>
                            {accounts?.map((account:BankAccount, index: number) => (
                            <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="space-y-4">
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <Banknote className="w-5 h-5 text-[#BA833C]" />
                                        {account?.type == BankAccountType.LOCAL ? "Local Bank Account" : "International Account"}
                                        </h2>
                                    </div>

                                
                                    <div className="flex flex-col text-sm">

                                        <div className="space-y-2 flex flex-row">
                                            <label className="text-base font-medium text-gray-500 mt-1 mr-1">Account Name:</label>
                                            <span className="font-medium text-gray-900">
                                                {account?.name || '-'}
                                            </span>
                                        </div>

                                        {(account?.type == BankAccountType.LOCAL) ? 
                                        (
                                            account?.bank && <div className="space-y-2 flex-row">
                                            <label className="text-base font-medium text-gray-500">Bank Name: </label>
                                            <span className="font-medium text-gray-900">
                                            {account?.bank?.name || 'Not specified'}
                                            </span>
                                        </div>
                                        ) 
                                        :
                                        (
                                            <div className="space-y-2 flex-row">
                                                <label className="text-base font-medium text-gray-500">Swift/BIC: </label>
                                                <span className="font-medium text-gray-900">
                                                {account?.swift_bic || 'Not specified'}
                                                </span>
                                            </div>
                                        )}

                                        <div className="space-y-2 flex-row">
                                            <label className="text-base font-medium text-gray-500 mr-1">
                                                { account?.type == BankAccountType.LOCAL ? "Account Number" : "IBAN"}:
                                            </label>
                                            <span className="font-medium text-gray-900">
                                                {account?.number || '-'}
                                            </span>
                                        </div>
                                        
                                    </div>
                                </div>

                            </div>
                            ))}
                        </div>
                        ) : (
                        <div className="w-full py-12 px-6 bg-gray-50 rounded-xl text-center">
                            <div className="max-w-xs mx-auto space-y-4">
                            <Search className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-gray-500 italic">
                                No account details found
                            </p>
                            </div>
                        </div>
                        )}
                    </motion.div>
                    </div>
    );

}

{/* <div className="flex flex-col items-center space-y-4">
    <div className="space-y-2 w-full">
        <label className="text-xs font-medium text-gray-500">Account Name</label>
        <p className="font-medium text-gray-900">
        {account?.name || 'Not specified'}
        </p>
    </div>
    <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center">
        {account?.url && (
        <QRCode
            value={account?.url}
            size={160}
            className="p-2 bg-white rounded-md"
            fgColor="#BA833C"
        />
        )}
        <p className="text-xs text-gray-500 mt-3 text-center">
        Scan QR code to view payment details
        </p>
    </div>
</div> */}

export default BankAccounts;