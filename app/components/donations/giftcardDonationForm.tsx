'use client';

import { useGiftCardStore } from '@/app/stores/useGiftCardStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const GiftCardDonateForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cardType, amount } = useGiftCardStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('cardType', cardType);
      formData.append('amount', amount.toString());

      const response = await fetch('/api/send-giftcards', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
          result.error ||
          `Submission failed (Status: ${response.status})`
        );
      }

      toast.success(
        `Your ${cardType} gift card for $${amount} has been received successfully!`,
        {
          position: "top-center",
          autoClose: 50000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      setSubmitted(true);

      setTimeout(() => {
        router.push('/donate');
      }, 1000);

    } catch (err) {
      console.error('Submission error details:', err);

      let errorMessage = 'Submission failed. Please try again later.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl text-center space-y-4">
        <div className="text-green-600 font-medium text-lg">
          🎉 Thank you for your donation!
        </div>
        <p className="text-gray-700">
          Your {cardType} gift card for ${amount} has been received.
        </p>
        <p className="text-sm text-gray-600">
          Need help?{' '}
          <a
            href="https://wa.me/14703903270"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact us on WhatsApp
          </a>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Redirecting you back to donate page...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Donate Your Gift Card</h2>

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="font-medium">{cardType}</p>
        <p className="text-lg font-bold">${amount}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardCode" className="block text-sm font-medium text-gray-700 mb-1">
            Gift Card Code
          </label>
          <input
            id="cardCode"
            name="cardCode"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your gift card code"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the full code from your gift card
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email (optional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            For donation receipt and updates
          </p>
        </div>

        <div>
          <label htmlFor="screenshot" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Screenshot (optional)
          </label>
          <input
            id="screenshot"
            name="screenshot"
            type="file"
            accept="image/*,.pdf"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Max 5MB (JPEG, PNG, GIF, or PDF)
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            <p className="font-medium">Error submitting form:</p>
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'}
            transition-colors flex items-center justify-center`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : 'Submit Gift Card'}
        </button>
      </form>
    </div>
  );
};

export default GiftCardDonateForm;
