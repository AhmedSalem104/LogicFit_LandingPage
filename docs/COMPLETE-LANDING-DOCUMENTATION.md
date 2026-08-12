# LogicFit Landing Page — التوثيق الكامل

هذا المستودع هو الواجهة التسويقية العامة لـLogicFit، وليس تطبيق Tenant أو لوحة إدارة
المنصة. هو موقع Static ثنائي اللغة، ولا ينشئ Tenant ولا يفعّل اشتراكاً ولا يصل إلى
Connection String أو API محمي.

## 1. خريطة الملفات والتشغيل

| الملف | الوظيفة |
|---|---|
| `index.html` | الصفحة الإنجليزية، اتجاه LTR. |
| `ar/index.html` | الصفحة العربية، اتجاه RTL، وهي النسخة الأساسية للسوق العربي. |
| `assets/css/style.css` | Design system مشترك، الألوان، responsive، الوضع الداكن، والحركة. |
| `assets/js/main.js` | التفاعلات المشتركة، الثيم، النماذج، العدادات، الرسم، والـdemo. |
| `assets/images/logicfit-dashboard.png` | أصل بصري للعرض التسويقي. |
| `assets/brand/logicfit-dumbbell.svg` | العلامة البصرية. |

التشغيل لا يحتاج build أو dependencies:

```bash
python -m http.server 8000
```

ثم تفتح `/` للإنجليزية أو `/ar/` للعربية.

## 2. خريطة الصفحات والأقسام

يوجد مساران عامان فقط:

| المسار | اللغة | الحالة | الإجراء الرئيسي |
|---|---|---|---|
| `/` | English / LTR | صفحة تسويقية قابلة للعرض العام | Start free trial أو Book a demo |
| `/ar/` | العربية / RTL | نفس المحتوى مع ترجمة واتجاه عربي | ابدأ التجربة أو احجز عرضاً |

الأقسام داخل كل صفحة مرتبة كالتالي:

1. Hero وLive Console لإظهار قيمة المنتج والمؤشرات.
2. المشكلة التي يحلها LogicFit.
3. تسعة أنظمة تشغيلية.
4. التدريب والنتائج الرقمية.
5. People visual proof.
6. White-label app مع تبديل العلامة.
7. الأدوار: Owner وCoach وClient.
8. Metrics strip.
9. Call to action والنماذج.

## 3. التدفق الوظيفي للمستخدم

```text
فتح الصفحة
  -> اختيار اللغة أو الثيم
  -> قراءة القيمة والأقسام
  -> Start free trial أو Book a demo
  -> تحقق inline من البيانات
  -> حفظ lead receipt محلياً فقط
  -> عرض رسالة نجاح داخل الصفحة
```

الـLanding لا ينفذ تدفق التسجيل الحقيقي. عند تفعيل عقد CRM يجب استبدال الحفظ المحلي
بطلب HTTPS إلى endpoint موثق، مع إبقاء معالجة loading/success/error وعدم إرسال بيانات
إلى خادم غير معتمد.

## 4. كل زر وتفاعل

| التفاعل | السلوك الحالي | البيانات/الأثر | الفشل المتوقع |
|---|---|---|---|
| Language switcher | ينتقل بين `/` و`/ar/` | لا يوجد تخزين خادم | رابط لغة غير موجود يعرض 404 من الاستضافة |
| Theme button | يبدل `data-theme` على `<html>` | يقرأ تفضيل النظام ولا يحتاج API | fallback إلى الثيم الافتراضي |
| Mobile menu | يفتح/يغلق القائمة ويغلقها عند اختيار رابط | حالة DOM فقط | يجب ألا يحجب keyboard focus |
| Start free trial | يفتح/يظهر نموذج بريد العمل | `logicfit_trial_lead` في `localStorage` بعد النجاح المحلي | رسالة inline للبيانات الناقصة |
| Book a demo | يفتح modal باسم الجيم والبريد وعدد الفروع | `logicfit_demo_lead` في `localStorage` بعد النجاح المحلي | لا يعيد تحميل الصفحة ويشرح الحقول الخاطئة |
| Brand swatches | يغير `--brand` واسم/حرف الشعار في mock app | حالة عرض مؤقتة | يرجع للقيمة الافتراضية إذا كان الـattribute ناقصاً |
| Scroll reveals/count-up/chart/bars | مؤثرات عرض غير تجارية | لا يوجد أثر بيانات | تتوقف أو تبسط عند `prefers-reduced-motion` |

## 5. عقد البيانات المحلي

الحفظ الحالي ليس اشتراكاً ولا طلباً حقيقياً. هو Receipt محلي للعرض التجريبي فقط، ولا
يجب اعتباره دليلاً على إنشاء حساب.

```json
{
  "email": "prospect@example.com",
  "createdAt": "ISO-8601 timestamp",
  "source": "landing-page"
}
```

يحظر وضع Access Token أو كلمة مرور أو Connection String أو إثبات دفع في هذه الصفحة أو
في `localStorage`. عند ربط CRM يجب توثيق request/response الجديد داخل مستودع الـBackend
ومستودعي الواجهات في نفس التغيير.

## 6. التصميم والاستجابة

- `style.css` هو مصدر التصميم المشترك للغتين.
- `dir="ltr"` للإنجليزية و`dir="rtl"` للعربية.
- الألوان معرفة كـCSS custom properties، مع light/dark theme.
- الصور أسفل الصفحة lazy-loaded، والـhero لا يعتمد على تحميل صورة خارجية.
- كل الحركة تتبع `prefers-reduced-motion`.
- يجب اختبار الهاتف، tablet، desktop، keyboard، focus، contrast، ونصوص العربية الطويلة.

## 7. الأمن والخصوصية

هذه الواجهة عامة، لذلك لا تحتوي على صلاحيات أو بيانات مستخدمين حقيقية. لا تُضاف أسرار
إلى HTML أو JavaScript أو CSS أو Git. أي تكامل مستقبلي مع التسجيل أو CRM يجب أن يمر عبر
API موثق مع validation وrate limiting وCORS مضبوط، وليس عبر Connection مباشر من المتصفح.

## 8. اختبار التسليم

| الاختبار | المتوقع |
|---|---|
| فتح `/` و`/ar/` | 200، CSS/JS والصور تعمل دون 404. |
| تبديل اللغة | انتقال صحيح مع الحفاظ على محتوى اللغة والاتجاه. |
| فتح/غلق القائمة | يعمل بالماوس ولوحة المفاتيح ولا يخرج خارج الشاشة. |
| تبديل الثيم | الألوان تتغير ولا تختفي النصوص أو الأزرار. |
| نماذج trial/demo | تحقق inline، نجاح واضح، وعدم reload أو stack trace. |
| إعادة فتح الصفحة | لا يظهر ادعاء إنشاء حساب من receipt المحلي. |
| brand demo | يتغير الاسم واللون فقط داخل mock app. |
| reduced motion | لا توجد حركة إجبارية مزعجة. |
| responsive/accessibility | لا overflow أفقي، focus مرئي، alt وlabels واضحة. |

## 9. حدود التكامل مع LogicFit

التسجيل الفعلي لـ`Gym` أو `FreelanceCoach` يبدأ من تطبيق الهوية/المنصة ويمر بالطلب
والدفع والمراجعة والتجهيز والاشتراك والعضوية. تفاصيله في:

- `LogicFit/docs/COMPLETE-PROJECT-DOCUMENTATION.md`
- `LogicFit_Angular/docs/COMPLETE-SCREEN-DOCUMENTATION.md`
- `LogiFit_Platform_Admin_Dashboard/docs/COMPLETE-PLATFORM-ADMIN-DOCUMENTATION.md`

أي زر في هذه الصفحة لا يُعلن أن المساحة أصبحت Active قبل أن يؤكد الـBackend الشروط
الفعلية: `Application Approved + Payment Approved + Tenant Active + Subscription Active
+ Database Ready + Owner Membership Active`.

## 10. صيانة التوثيق

أي تغيير في قسم أو Route أو نموذج أو key في `localStorage` أو عقد CRM يجب أن يحدث هذا
الملف و`README.md` في نفس الـPull Request. لا تُنسخ عقود Tenant API إلى هذا المستودع؛
يُكتفى بروابطها حتى لا تصبح نسخة قديمة أو تكشف تفاصيل داخلية.
