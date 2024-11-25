import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config()

export async function POST(request: NextRequest) {
  const { initData } = await request.json();

  const SECRET_KEY = crypto.createHash('sha256')
    .update(process.env.BOT_TOKEN as string)
    .digest();

  const urlSearchParams = new URLSearchParams(initData);
  const params = Object.fromEntries(urlSearchParams.entries());

  const { hash } = params;
  delete params.hash;

  const dataCheckString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('\n');

  const hmac = crypto.createHmac('sha256', SECRET_KEY)
    .update(dataCheckString)
    .digest('hex');

  if (hmac === hash) {
    // Data is valid
    return NextResponse.json({ valid: true });
  } else {
    // Data is invalid
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
