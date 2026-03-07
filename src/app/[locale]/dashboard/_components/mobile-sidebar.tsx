

import { CardContent } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import {
  ClipboardList,
    Trophy,
    User,
} from 'lucide-react';
import Link from 'next/link'
import { redirect } from 'next/navigation';

export default async function MobileSidebar({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  
  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  return (
    <>  
        <aside className="flex flex-row gap-2">
        {/* Stats Cards */}

        <Link href={`/${locale}/dashboard/settings`} className='block'>
          <div className="border rounded-full border-primary dark:bg-[#0e4a38] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary p-1">
              <CardContent>
                
                  <div className="rounded-xl flex items-center justify-center">
                    <User className="size-6" />
                  </div>
                  
                
              </CardContent>
          </div>
        </Link>

        <Link href={`/${locale}/dashboard/result`} className='block'>
          <div className="border rounded-full border-primary dark:bg-[#0e4a38] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary p-1">
            <CardContent>
              
                <div className="rounded-xl flex items-center justify-center">
                  <ClipboardList className="size-6" />
                </div>
               
            </CardContent>
          </div>
        </Link>

        <Link href={`/${locale}/dashboard/last`} className='block'>
          <div className="rounded-full border border-primary dark:bg-[#0e4a38] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary p-1">
            <CardContent>
              
               
                  <Trophy className="size-6 " />
               
               
              
            </CardContent>
          </div>
        </Link>

        </aside>
      </>
  );
}
