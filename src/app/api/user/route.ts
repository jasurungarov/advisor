/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { compare, hash, genSalt } from "bcryptjs";
import { auth } from "@/lib/auth";
import { COLLECTIONS, getDatabase } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models";

// 1. Foydalanuvchi ma'lumotlarini olish (Sahifa yuklanganda ism va email chiqishi uchun)
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Avtorizatsiya xatosi" }, { status: 401 });
    }

    const db = await getDatabase();
    const user = await db.collection<User>(COLLECTIONS.USERS).findOne(
      { email: session.user.email.toLowerCase() },
      { projection: { password: 0 } } // Parolni jo'natmaymiz
    );

    if (!user) {
      return NextResponse.json({ message: "Foydalanuvchi topilmadi" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}

// 2. Foydalanuvchi ma'lumotlarini yangilash
export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Ruxsat yo'q" }, { status: 401 });
    }

    const { name, email, currentPassword, newPassword } = await req.json();
    const db = await getDatabase();
    const usersCollection = db.collection<User>(COLLECTIONS.USERS);

    const user = await usersCollection.findOne({ email: session.user.email.toLowerCase() });
    if (!user) return NextResponse.json({ message: "Topilmadi" }, { status: 404 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { updatedAt: new Date() };
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ message: "Eski parolni kiriting" }, { status: 400 });
      }
      const isMatch = await compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Eski parol noto'g'ri" }, { status: 400 });
      }
      const salt = await genSalt(12);
      updateData.password = await hash(newPassword, salt);
    }

    await usersCollection.updateOne({ _id: user._id }, { $set: updateData });

    return NextResponse.json({ message: "Yangilandi" });
  } catch (error) {
    return NextResponse.json({ message: "Xatolik" }, { status: 500 });
  }
}


export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Ruxsat yo'q" }, { status: 401 });
    }

    const db = await getDatabase();
    
    // Foydalanuvchini o'chirish
    const result = await db.collection(COLLECTIONS.USERS).deleteOne({ 
      email: session.user.email.toLowerCase() 
    });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Hisob o'chirildi" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Foydalanuvchi topilmadi" }, { status: 404 });
    }
  } catch (error) {
    console.error("DELETE_USER_ERROR:", error);
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}