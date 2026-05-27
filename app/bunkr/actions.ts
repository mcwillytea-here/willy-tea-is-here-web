'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const HateSchema = z.object({
  sender_name: z.string().max(50).optional(),
  message: z.string().min(5, { message: 'Kámo, napiš aspoň 5 znaků, jinak to nemá smysl číst.' }).max(1000),
  email: z.string().email({ message: 'Zadej platnej e-mail, nebo se bojíš, že tě najdu?' }).optional().or(z.literal(''))
});

export async function submitHate(formData: FormData) {
  // 1. KONTROLA HONEYPOTU: Pokud bot vyplnil skryté pole, okamžitě končíme
  const botTrap = formData.get('bot_trap_username');
  if (botTrap && String(botTrap).length > 0) {
    // Předstíráme úspěch, aby bot nezkoušel jiné metody
    return { success: 'Zpráva odeslána do logu. Nečekej zázraky.' };
  }

  const result = HateSchema.safeParse({
    sender_name: formData.get('sender_name'),
    message: formData.get('message'),
    email: formData.get('email')
  });
  
  if (!result.success) {
    return { error: result.error.issues[0]?.message || 'Invalid input' };
  }

  // Zde by byl insert do Supabase
  // await supabase.from('hate_mail').insert({ message: result.data.message, email: result.data.email })
  
  // Simulace zpoždění
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  revalidatePath('/bunkr');

  return { success: 'Zpráva odeslána do logu. Nečekej zázraky.' };
}
