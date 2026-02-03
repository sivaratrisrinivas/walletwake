import { NextResponse } from 'next/server';
import { searchMockProducts } from '@/lib/mock-db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
    }

    try {
        // Call our Mock DB
        const results = await searchMockProducts(query);

        // Return the results in a JSON wrapper
        return NextResponse.json({ itemSummaries: results });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}