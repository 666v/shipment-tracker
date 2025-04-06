import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrackerForm } from "@/components/tracker-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* الهيدر */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center">
          <div className="w-full max-w-5xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-[Tajawal]">
                  تتبع شحنات SMSA المتعددة في وقت واحد
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-[Tajawal]">
                  أدخل أرقام التتبع المتعددة واحصل على تحديثات في الوقت الفعلي لجميع شحناتك في مكان واحد
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* النموذج والمميزات */}
        <section className="w-full py-12 px-4 md:px-6 flex justify-center">
          <div className="w-full max-w-5xl grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-[Tajawal]">تتبع شحناتك</CardTitle>
                <CardDescription className="font-[Tajawal]">
                  أدخل أرقام التتبع المتعددة (واحد في كل سطر أو مفصولة بفواصل)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrackerForm />
              </CardContent>
            </Card>

            {/* البطاقات */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-[Tajawal]">تتبع سهل</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-[Tajawal]">
                    تتبع شحنات متعددة في وقت واحد دون الحاجة إلى إدخالها واحدة تلو الأخرى
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-[Tajawal]">تحديثات في الوقت الفعلي</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-[Tajawal]">
                    احصل على آخر تحديثات الحالة لجميع شحنات SMSA الخاصة بك في لوحة معلومات واحدة
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-[Tajawal]">حفظ سجل التتبع</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-[Tajawal]">
                    احفظ أرقام التتبع الخاصة بك للرجوع إليها في المستقبل والوصول السريع
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* الفوتر */}
      <footer className="border-t py-6">
        <div className=" flex items-center justify-center">
          <p className="text-center text-sm leading-loose text-muted-foreground font-[Tajawal]">
            © 2025 تطوير وإنشاء{" "}
            <Link
              href="https://www.instagram.com/3lidarweesh/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              علي درويش
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
