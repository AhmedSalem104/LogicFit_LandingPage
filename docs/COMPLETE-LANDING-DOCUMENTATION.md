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
| `assets/js/main.js` | التفاعلات المشتركة، الثيم، القائمة، العدادات، الـreveal، والحركة الخفيفة. |
| `assets/images/logicfit-dashboard.png` | أصل بصري للعرض التسويقي. |
| `assets/brand/logicfit-new-logo.png` | العلامة البصرية الحالية والـfavicon. |

التشغيل لا يحتاج build أو dependencies:

```bash
python -m http.server 8000
```

ثم تفتح `/` للإنجليزية أو `/ar/` للعربية.

## 2. خريطة الصفحات والأقسام

يوجد مساران عامان فقط:

| المسار | اللغة | الحالة | الإجراء الرئيسي |
|---|---|---|---|
| `/` | English / LTR | صفحة تسويقية قابلة للعرض العام | Start free trial |
| `/ar/` | العربية / RTL | نفس المحتوى مع ترجمة واتجاه عربي | ابدأ التجربة أو احجز عرضاً |

الأقسام داخل كل صفحة مرتبة كالتالي:

1. Hero وLive Operations View لإظهار قيمة المنتج والمؤشرات.
2. Proof metrics وOperating Outcomes.
3. كتالوج 13 قدرة تشغيلية.
4. Web/Mobile Product Showcase.
5. Member Journey: التدريب والتغذية والتقدم.
6. أدوار الفريق: Owner وManager وCoach وReception.
7. Customer Story وFAQ.
8. Final CTA وFooter.

## 3. التدفق الوظيفي للمستخدم

```text
فتح الصفحة
  -> اختيار اللغة أو الثيم
  -> قراءة القيمة والأقسام
  -> Start free trial
  -> الانتقال إلى مسار التسجيل الخارجي
```

الـLanding لا ينفذ تدفق التسجيل الحقيقي ولا يحتوي حاليًا على Form أو Modal لتجميع
بيانات العملاء. التسجيل يتم في التطبيق الخارجي عبر الرابط الموجود في أزرار الـCTA.

## 4. كل زر وتفاعل

| التفاعل | السلوك الحالي | البيانات/الأثر | الفشل المتوقع |
|---|---|---|---|
| Language switcher | ينتقل بين `/` و`/ar/` | لا يوجد تخزين خادم | رابط لغة غير موجود يعرض 404 من الاستضافة |
| Theme button | يبدل `data-theme` على `<html>` | يقرأ تفضيل النظام ولا يحتاج API | fallback إلى الثيم الافتراضي |
| Mobile menu | يفتح/يغلق القائمة ويغلقها عند اختيار رابط | حالة DOM فقط | يجب ألا يحجب keyboard focus |
| Start free trial | ينتقل إلى مسار التسجيل الخارجي | لا يوجد تخزين محلي | يعتمد توفر المسار الخارجي |
| Theme button | يبدل `data-theme` على `<html>` | تفضيل الثيم في `logicfit_theme` | fallback إلى تفضيل النظام |
| Language switcher | ينتقل بين `/` و`/ar/` | لا يوجد تخزين خادم | رابط لغة غير موجود يعرض 404 من الاستضافة |
| Mobile menu | يفتح/يغلق القائمة، ويدعم Escape والضغط خارجها | حالة DOM فقط | يغلق عند اختيار رابط أو تغيير breakpoint |
| Scroll reveals/count-up/pointer motion | مؤثرات عرض فقط | لا يوجد أثر بيانات | تتوقف أو تتبسط عند `prefers-reduced-motion` |

## 5. عقد البيانات المحلي

لا تحفظ الصفحة بيانات عميل أو Lead. التخزين المحلي المستخدم حاليًا يقتصر على تفضيل
الثيم (`logicfit_theme`). لا يمثل ذلك إنشاء حساب أو اشتراكًا.

يحظر وضع Access Token أو كلمة مرور أو Connection String أو إثبات دفع في هذه الصفحة أو
في `localStorage`. أي تكامل مستقبلي مع CRM يجب أن يمر عبر عقد API موثق.

## 6. التصميم والاستجابة

- `style.css` هو مصدر التصميم المشترك للغتين.
- `dir="ltr"` للإنجليزية و`dir="rtl"` للعربية.
- الألوان معرفة كـCSS custom properties، مع light/dark theme.
- الصور أسفل الصفحة lazy-loaded مع `width`/`height`، وصورة الـhero ذات أولوية تحميل عالية.
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
| Start free trial | يفتح مسار التسجيل الخارجي دون تغيير في العقد المحلي. |
| إعادة فتح الصفحة | لا يظهر ادعاء إنشاء حساب أو اشتراك من الصفحة. |
| الصور والأصول | كل الأصول المحلية المستخدمة متاحة وتعود دون 404. |
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
