import { env } from '@/env.mjs';
import { Resend } from 'resend';

export const resendClient = new Resend(env.NEXT_PUBLIC_RESEND_API_KEY);