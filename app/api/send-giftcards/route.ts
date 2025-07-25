import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const getField = (name: string): string => {
      const value = formData.get(name);
      return value instanceof File ? '' : value?.toString().trim() || '';
    };

    const cardType = getField('cardType');
    const amount = getField('amount');
    const cardCode = getField('cardCode');
    const email = getField('email');
    const file = formData.get('screenshot') as File | null;

    if (!cardType || !amount || !cardCode.trim()) {
      return NextResponse.json(
        { success: false, message: 'Card type, amount, and card code are required' },
        { status: 400 }
      );
    }

    let fileUrl: string | null = null;
    let fileType: string | null = null;

    if (file && file.size > 0) {
      // Check file size
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: 'File too large (max 5MB)' },
          { status: 400 }
        );
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: 'Invalid file type. Only images and PDFs are allowed' },
          { status: 400 }
        );
      }

      // Upload file to Supabase Storage
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileExt = file.name.split('.').pop();
      const fileName = `giftcards/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Supabase file upload error:', uploadError);
        return NextResponse.json(
          { success: false, message: 'Failed to upload file' },
          { status: 500 }
        );
      }

      fileUrl = `uploads/${fileName}`;
      fileType = file.type;
    }

    // Store form data in Supabase
    const { error: dbError } = await supabase.from('giftcards').insert({
      card_type: cardType,
      amount: parseFloat(amount),
      card_code: cardCode,
      email: email || null,
      file_url: fileUrl,
      file_type: fileType,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Failed to save submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Gift card submitted successfully'
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
