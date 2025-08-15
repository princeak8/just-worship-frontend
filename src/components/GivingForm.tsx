

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Heart, Send } from 'lucide-react';
// import type { Currency } from '@/Enums/Giving';
import { RecurrentType, Currency } from '@/Enums/Giving';
import { useCountriesQuery, useGivingPartnerMutation } from '@/app/api';
import type { Country } from '@/Types';

const GivingForm = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
//   const [countries, setCountries] = useState([]);
  const [givingOptions, setGivingOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const { data: {data: countries} = [], isLoading: loadingCountries } = useCountriesQuery<Country[] | any | undefined>(undefined);
  const [partner, { isError, error: partnerError, isSuccess}] = useGivingPartnerMutation()

  const [formData, setFormData] = useState<{
    firstname: string;
    surname: string;
    email: string;
    phone: string;
    countryId: number | undefined;
    givingOptionId: string;
    recurrent: boolean;
    recurrentType: string;
    amount: number | undefined;
    currency: Currency | '';
    prayerPoint: string;
  }>({
    firstname: '',
    surname: '',
    email: '',
    phone: '',
    countryId: undefined,
    givingOptionId: '',
    recurrent: false,
    recurrentType: '',
    amount: undefined,
    currency: Currency.DOLLARS,
    prayerPoint: ''
  });

  const recurrentTypes = [
    { value: RecurrentType.MONTHLY, label: 'Monthly' },
    { value: RecurrentType.YEARLY, label: 'Yearly' }
  ];

  // Fetch countries and giving options on component mount
  useEffect(() => {
    // fetchCountries();
    // fetchGivingOptions();
    handleSelectedCountry()
  }, [formData.countryId]);

  useEffect(() => console.log("formData:", formData));

//   const fetchGivingOptions = async () => {
//     try {
//       const response = await fetch('/api/giving/options');
//       const data = await response.json();
//       setGivingOptions(data);
//     } catch (error) {
//       console.error('Error fetching giving options:', error);
//     }
//   };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    console.log("name", name);
    console.log("value", value);
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // if(name === "countryId") handleSelectedCountry();

    // console.log("formData:", formData);

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.countryId) newErrors.countryId = 'Country code is required';
    // if (!formData.giving_option_id) newErrors.giving_option_id = 'Please select a giving option';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    else if (isNaN(Number(formData.amount)) || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (formData.recurrent && !formData.recurrentType) {
      newErrors.recurrent_type = 'Please select recurrent type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
    //   const response = await fetch('/api/giving_partners', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    //   });

    //   const data = await response.json();
    await partner(formData).unwrap();

    console.log("isSuccess:", isSuccess);
    console.log("isError:", isError);

    setSuccess(true);
    setFormData({
        firstname: '',
        surname: '',
        email: '',
        phone: '',
        countryId: undefined,
        givingOptionId: '',
        recurrent: false,
        recurrentType: '',
        amount: undefined,
        currency: Currency.DOLLARS,
        prayerPoint: ''
    });
    setTimeout(() => {
        setSuccess(false);
        // setIsCollapsed(true);
    }, 10000);

    } catch (error: any) {
        console.log("error:", error?.data?.error);
      if (error) {
        setErrors({ general: error?.data?.error });
    } else {
        setErrors({ general: 'Something went wrong' });
    }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedCountry = () => {
    const selectedCountry = countries?.find((country: any) => country.id === Number(formData.countryId));
    setSelectedCountry(selectedCountry);
  }
  
//   console.log("selected COuntry:", selectedCountry);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div 
        className="bg-gradient-to-tr from-[#6b4e00] via-[#8a6a0a] to-[#a97c0f] text-white p-6 cursor-pointer hover:from-[#a8830a] hover:via-[#d6a018] hover:to-[#ffd94a] transition-all duration-300"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Click to partner with us through your giving</h2>
          </div>
          {isCollapsed ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-6">
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Thank you for your partnership! Your submission has been received.
              </div>
            </div>
          )}

          {errors.general && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstname ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surname *
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.surname ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your surname"
                />
                {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select name="countryId" value={formData.countryId} onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.country_code ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Country</option>
                  {countries?.map((country: any) => (
                    <option key={country.code} value={country.id}>
                      {country.name} ({country.phoneCode})
                    </option>
                  ))}
                </select>
                {errors.countryId && <p className="text-red-500 text-sm mt-1">{errors.countryId}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-lg">
                    {selectedCountry ? selectedCountry.phoneCode : '+000'}
                  </span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className={`flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giving Option *
              </label>
              <select
                name="giving_option_id"
                value={formData.givingOptionId}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.giving_option_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a giving option</option>
                {givingOptions?.map((option: any) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.giving_option_id && <p className="text-red-500 text-sm mt-1">{errors.giving_option_id}</p>}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount *
                    </label>
                    <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.amount ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                    />
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                    </label>
                    <select name='currency' value={formData.currency} onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        {Object.values(Currency).map((curr) => (
                            <option key={curr} value={curr}>
                            {curr.charAt(0).toUpperCase() + curr.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="recurrent"
                  id="recurrent"
                  checked={formData.recurrent}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="recurrent" className="ml-2 text-sm font-medium text-gray-700">
                  Make this a recurring donation
                </label>
              </div>

              {formData.recurrent && (
                <div className="ml-6 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Recurrent Type *
                  </label>
                  <div className="space-y-2">
                    {recurrentTypes.map(type => (
                      <div key={type.value} className="flex items-center">
                        <input
                          type="radio"
                          name="recurrentType"
                          id={type.value}
                          value={type.value}
                          checked={formData.recurrentType === type.value}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={type.value} className="ml-2 text-sm text-gray-700">
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.recurrent_type && <p className="text-red-500 text-sm mt-1">{errors.recurrent_type}</p>}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prayer Point (Optional)
              </label>
              <textarea
                name="prayerPoint"
                value={formData.prayerPoint}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share any prayer requests..."
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <div className="flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Partnership
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GivingForm;