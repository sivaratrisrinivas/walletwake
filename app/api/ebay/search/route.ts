import { NextResponse } from 'next/server';
import { searchMockProducts } from '@/lib/mock-db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || "";

    // Pure Mock Logic - Fast, Reliable, No Keys needed
    const mockResults = await searchMockProducts(query);

    return NextResponse.json({ itemSummaries: mockResults });
}