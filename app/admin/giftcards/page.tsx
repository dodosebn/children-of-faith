'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Giftcard = {
  id: string;
  email: string;
  amount: number;
  card_code: string;
  card_type: string;
  created_at: string;
  file_public_url: string | null;
};

const sanitizeUrl = (url: string) => {
  try {
    const u = new URL(url);
    u.pathname = u.pathname.replace(/(\/uploads)+/g, '/uploads');
    return u.toString();
  } catch {
    return url;
  }
};

const GiftcardPage = () => {
  const router = useRouter();
  const [giftcards, setGiftcards] = useState<Giftcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdmin');
    if (isAuthenticated !== 'true') {
      toast.error('You must be logged in to access this page');
      router.push('/admin/login');
      return;
    }

    const fetchGiftcards = async () => {
      try {
        const res = await fetch('/api/giftcards');
        const json = await res.json();

        if (json.success) {
          setGiftcards(json.data);
        } else {
          console.error('Failed to load giftcards:', json.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGiftcards();
  }, [router]);

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">Uploaded Giftcards</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {giftcards.map((giftcard) => {
            const cleanUrl = giftcard.file_public_url
              ? sanitizeUrl(giftcard.file_public_url)
              : null;

            return (
              <div key={giftcard.id} className="border rounded-lg p-4 shadow-sm">
                <p><strong>Email:</strong> {giftcard.email}</p>
                <p><strong>Amount:</strong> ${giftcard.amount}</p>
                <p><strong>Card Type:</strong> {giftcard.card_type}</p>
                <p><strong>Card Code:</strong> {giftcard.card_code}</p>
                <p><strong>Submitted:</strong> {new Date(giftcard.created_at).toLocaleString()}</p>

                {cleanUrl ? (
                  <div
                    className="relative w-full h-64 mt-2 cursor-pointer"
                    onClick={() => setSelectedImage(cleanUrl)}
                  >
                    <Image
                      src={cleanUrl}
                      alt="Giftcard image"
                      layout="fill"
                      objectFit="contain"
                      className="rounded"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">No image uploaded</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            <RxCross2 />
          </button>
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={selectedImage}
              alt="Fullscreen image"
              layout="fill"
              objectFit="contain"
              className="rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftcardPage;
