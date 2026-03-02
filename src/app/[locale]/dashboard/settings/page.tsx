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
import { useState } from "react";
import { toast } from "sonner";
import { FaAngleLeft } from "react-icons/fa6";
import Link from 'next/link'


function Page() {
  const [loading] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <div className='gap-4 flex flex-row items-center'>
        <Link href="/dashboard" className="">
        <FaAngleLeft className="size-6" />
        </Link>
      <h1 className="text-3xl font-bold">Account Settings</h1>
      </div>


      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile updated");
          }} className="space-y-4 ">

            <div className='space-y-2'>
              <Label>Name</Label>
              <Input placeholder="Your name" />
            </div>

            <div className='space-y-2'>
              <Label>Email</Label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div className='space-y-2 mt-6'>
              <CardTitle>Security</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </div>

            <div className='space-y-2'>
              <Label>Current Password</Label>
              <Input type="password" />
            </div>

            <div className='space-y-2'>
              <Label>New Password</Label>
              <Input type="password" />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Permanently delete your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
