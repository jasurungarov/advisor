/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaAngleLeft } from "react-icons/fa6";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { signOut } from "next-auth/react";


// SafeUser interface'dan foydalanamiz
interface UserData {
  name: string;
  email: string;
}

function Page() {
  const t = useTranslations('profile');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form statelari
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: ""
  });

  // 1. Dastlabki ma'lumotlarni olish (Masalan, session yoki API orqali)
  useEffect(() => {
    // Bu yerda foydalanuvchi ma'lumotlarini fetch qilish mumkin
    // Hozircha namunaviy ma'lumot:
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const userData: UserData = await response.json();
          setFormData(prev => ({
            ...prev,
            name: userData.name,
            email: userData.email
          }));
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success((t('account.updateButton')));
        router.refresh(); // Ma'lumotlarni yangilash
      } else {
        const error = await response.json();
        toast.error(error.message || (t('account.error')));
      }
    } catch (err) {
      toast.error((t('account.serverErorr')));
    } finally {
      setLoading(false);
    }
  };

 const handleDeleteAccount = async () => {
  // 1. Tasdiqlash
  if (!confirm(t('dangerZone.deleteAccount.confirmMessage'))) return;

  setLoading(true);
  try {
    // 2. API orqali bazadan o'chirish
    const response = await fetch("/api/user", {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success(t('dangerZone.deleteAccount.deleted'));
      
      // 3. Logout va yo'naltirish
      // Agar 'next-auth/react' ishlatayotgan bo'lsangiz signOut() ishlating
      // Bo'lmasa shunchaki bosh sahifaga push va refresh
      signOut({ callbackUrl: "/", redirect: true })
    } else {
      const error = await response.json();
      toast.error(error.message || (t('account.error')));
    }
  } catch (err) {
    toast.error((t('account.serverErorr')));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8 px-4">
      <div className='gap-4 flex flex-row items-center'>
        <Link href="/dashboard">
          <FaAngleLeft className="size-6 hover:text-primary transition-colors" />
        </Link>
        <div className='flex flex-col gap-1'>
        <h1 className="md:text-3xl text-xl font-bold">{t('title')}</h1>
          <CardDescription>{t('subtitle')}</CardDescription>
        </div>
      </div>

      <Card className='bg-body'>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className='space-y-2'>
              <Label htmlFor="name">{t('account.name')}</Label>
              <Input 
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange} 
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor="email">{t('account.email')}</Label>
              <Input 
                id="email"
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor="currentPassword">{t('account.password')}</Label>
              <div className="relative">
              <Input 
                id="currentPassword"
                name="currentPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a6e5d] hover:text-brand-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="newPassword">{t('account.newPassword')}</Label>
              <div className="relative">
              <Input 
                id="newPassword"
                name="newPassword"
                type={showPassword ? 'text' : 'password'} 
                value={formData.newPassword}
                onChange={handleChange}
              />
              <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a6e5d] hover:text-brand-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
            </div>

            <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
              {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('account.updating')}
                  </>
                ) : (
                  t('account.updateSaccess')
                )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50/10">
        <CardHeader>
          <CardTitle className="text-red-600">{t('dangerZone.title')}</CardTitle>
          <CardDescription>{t('dangerZone.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            {t('dangerZone.deleteAccount.button')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;