import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import fs from 'fs'
import path from 'path'

const filePath = path.resolve('.', 'assets/images/accessories_art.webp')
const imageBuffer = fs.readFileSync(filePath)

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = new NextResponse(imageBuffer)
    response.headers.set('content-type', 'image/png');
    return response;
}