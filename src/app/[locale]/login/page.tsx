/**
 * Login Page
 * 
 * User login form with validation and beautiful UI.
 */

'use client';

import { loginUser } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useRouter } from '@/i18n/routing';
import {
    AlertCircle,
    ChevronLeft,
    Eye,
    EyeOff,
    Loader2,
    Lock,
    LogIn,
    Mail,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('auth');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setMessage(null);

    const result = await loginUser(formData);

    if (result.success) {
      router.push('/dashboard');
      router.refresh();
    } else {
      setMessage(result.message);
      if (result.errors) {
        setErrors(result.errors);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-br from-brand-500/15 to-brand-700/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-linear-to-br from-brand-100 to-brand-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 dark:text-brand-100/70 hover:text-brand-500 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('backToHome')}
        </Link>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-[#0e4a38]/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-full bg-linear-to-r from-brand-900 to-brand-700 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-brand-900 dark:text-brand-100">
              {t('login.title')}
            </CardTitle>
            <CardDescription className="text-[#4a6e5d] dark:text-brand-100/70">
              {t('login.subtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {message && (
                <div className="p-4 rounded-lg flex items-center gap-3 bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{message}</span>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a6e5d]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('login.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''} dark:bg-[#021f15] dark:border-brand-500/20`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email[0]}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a6e5d]" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('login.passwordPlaceholder')}
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''} dark:bg-[#021f15] dark:border-brand-500/20`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a6e5d] hover:text-brand-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password[0]}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary "
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('login.signingIn')}
                  </>
                ) : (
                  t('login.submit')
                )}
              </Button>
            </form>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm dark:text-primary">
              {t('login.noAccount')}{' '}
              <Link
                href="/register"
                className="font-medium dark:text-white hover:text-brand-500"
              >
                {t('login.createOne')}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
