import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email } = await request.json();

    // Basic validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const mailUser = process.env.MAIL_USER;
    const mailPass = process.env.MAIL_PASS;

    if (!mailUser || !mailPass) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: `"Newsletter Subscription" <${mailUser}>`,
      to: mailUser,
      subject: `New Newsletter Subscriber: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Newsletter Subscriber</h2>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px;">
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      `,
    });

    // Welcome email to subscriber
    await transporter.sendMail({
      from: `"Children of Faith Homes & Private Help Services" <${mailUser}>`,
      to: email,
      subject: 'Thank you for subscribing!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Our Community!</h2>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px;">
            <p>Dear ${firstName},</p>
            <p>Thank you for subscribing to our newsletter. You'll now receive updates about how God is working through our ministry.</p>
            <p>If you didn't request this subscription, please ignore this email.</p>
            <p style="margin-top: 20px;">Blessings,<br/>The Children of Faith Homes & Private Help Services Team</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Subscription successful! Please check your email.' 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}