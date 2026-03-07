import { NextResponse } from "next/server";
import { compare, hash, genSalt } from "bcryptjs"; // bcryptjs ishlatganingiz uchun
import { auth } from "@/lib/auth";
import { COLLECTIONS, getDatabase } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models";

export async function PATCH(req: Request) {
  try {
    // 1. Session tekshirish (Auth.js v5)
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Avtorizatsiya xatosi" }, { status: 401 });
    }

    const { name, email, currentPassword, newPassword } = await req.json();

    // 2. DB ulanish
    const db = await getDatabase();
    const usersCollection = db.collection<User>(COLLECTIONS.USERS);

    // 3. Foydalanuvchini bazadan topish
    const user = await usersCollection.findOne({ 
      email: session.user.email.toLowerCase() 
    });

    if (!user) {
      return NextResponse.json({ message: "Foydalanuvchi topilmadi" }, { status: 404 });
    }

    // 4. Yangilanishlar obyekti
    const updateData: Partial<User> & { updatedAt: Date } = {
      updatedAt: new Date()
    };

    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();

    // 5. Parolni o'zgartirish (agar so'ralgan bo'lsa)
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ message: "Joriy parolni kiritishingiz shart" }, { status: 400 });
      }

      // Eski parolni tekshirish
      const isMatch = await compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Joriy parol noto'g'ri" }, { status: 400 });
      }

      // Yangi parolni xeshlash
      const salt = await genSalt(12);
      updateData.password = await hash(newPassword, salt);
    }

    // 6. Bazani yangilash
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: updateData }
    );

    return NextResponse.json({ message: "Profil muvaffaqiyatli yangilandi" }, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("USER_UPDATE_API_ERROR:", error);
    return NextResponse.json({ message: "Serverda ichki xatolik" }, { status: 500 });
  }
}


