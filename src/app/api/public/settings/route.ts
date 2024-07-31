import { NextResponse } from "next/server";
import { urlAPI } from '@/lib/constant';


interface ResponseData {
    id: number;
    key: string;
    label: string;
    type: string;
    value: string;
}

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const keys = searchParams.get('keys');
    const response = await fetch(`${urlAPI}backend/settings?keys=${keys}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        }
    });

    const data = await response.json();

    return NextResponse.json({ data });
  
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
  
  