import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('giftcards')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to retrieve submissions', error },
        { status: 500 }
      );
    }

    const enhancedData = data.map((entry) => {
      let file_public_url: string | null = null;

      if (entry.file_url) {
        // 🛠️ FIX: Don't prepend "uploads/" again if it's already part of the path
        const { data: publicData } = supabase.storage
          .from('uploads')
          .getPublicUrl(entry.file_url);

        file_public_url = publicData?.publicUrl || null;
      }

      return {
        ...entry,
        file_public_url,
      };
    });

    return NextResponse.json({
      success: true,
      data: enhancedData,
    });
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred', error: err.message },
      { status: 500 }
    );
  }
}
