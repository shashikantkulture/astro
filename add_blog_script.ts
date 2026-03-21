import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const content = `
    <p>आज सबसे बड़ा प्रश्न यही है —<br>
    <strong>मेरी नौकरी कब लगेगी?</strong><br>
    बहुत प्रयास करने के बाद भी जब सफलता नहीं मिलती,<br>
    तो इसका कारण केवल मेहनत की कमी नहीं होता।<br>
    कई बार समय (दशा), ग्रह स्थिति और निर्णय का समय सही नहीं होता।</p>
    
    <h3>🔮 ज्योतिष नौकरी के बारे में क्या बताता है?</h3>
    <p>ज्योतिष में नौकरी का संबंध मुख्य रूप से इनसे देखा जाता है:</p>
    <ul>
      <li>दशम भाव (Career House)</li>
      <li>शनि ग्रह (कर्म और स्थिरता)</li>
      <li>बुध ग्रह (बुद्धि और कार्य क्षमता)</li>
      <li>वर्तमान दशा और गोचर</li>
    </ul>
    <p>जब ये अनुकूल होते हैं,<br>
    तब अचानक अवसर मिलने लगते हैं।</p>
    
    <h3>⏳ देरी क्यों होती है?</h3>
    <p>नौकरी में देरी के मुख्य कारण:</p>
    <ul>
      <li>✔ सही समय से पहले प्रयास</li>
      <li>✔ शनि का परीक्षा काल</li>
      <li>✔ दिशा स्पष्ट न होना</li>
      <li>✔ गलत क्षेत्र का चयन</li>
      <li>✔ निर्णय में अस्थिरता</li>
    </ul>
    
    <h3>🌟 सही समय पहचानना क्यों जरूरी है?</h3>
    <p>ज्योतिष यह नहीं कहता कि कुछ न करें,<br>
    बल्कि यह बताता है:<br>
    कब प्रयास करें ताकि परिणाम मिले।<br>
    सही समय पर किया गया प्रयास<br>
    कम मेहनत में भी सफलता दिला सकता है।</p>
    
    <h3>📿 क्या ज्योतिष नौकरी दिला सकता है?</h3>
    <p>ज्योतिष नौकरी नहीं देता,<br>
    लेकिन यह बताता है:</p>
    <ul>
      <li>कौन सा क्षेत्र आपके लिए सही है</li>
      <li>कब अवसर मिलेगा</li>
      <li>कब बदलाव करना चाहिए</li>
      <li>कहाँ रुकना चाहिए, कहाँ आगे बढ़ना चाहिए</li>
    </ul>
    <p>यही सही दिशा सफलता लाती है।</p>
    
    <h3>📅 यदि आप भी जानना चाहते हैं:</h3>
    <ul>
      <li>नौकरी कब मिलेगी</li>
      <li>कौन सा क्षेत्र सही है</li>
      <li>प्रयास कब करें</li>
      <li>रुकावट क्यों आ रही है</li>
    </ul>
    <p>तो व्यक्तिगत कुंडली विश्लेषण द्वारा स्पष्ट मार्गदर्शन लिया जा सकता है।<br>
    सही दिशा मिल जाए, तो संघर्ष कम हो जाता है।</p>
    
    <p class="mt-8 font-bold text-gold">Consultation Booking Available on WhatsApp</p>
  `;

    // First, see if we already have it to avoid duplicates
    let existingPost = await prisma.blogPost.findUnique({ where: { slug: "meri-naukri-kab-lagegi" } });

    if (existingPost) {
        await prisma.blogPost.update({
            where: { slug: "meri-naukri-kab-lagegi" },
            data: {
                content: content,
            }
        });
        console.log("Blog post updated.");
    } else {
        await prisma.blogPost.create({
            data: {
                title: "मेरी नौकरी कब लगेगी? ज्योतिष से कैसे जानें",
                slug: "meri-naukri-kab-lagegi",
                excerpt: "ज्योतिष के अनुसार नौकरी में सफलता और देरी के कारण जानें। सही दिशा मिलने से संघर्ष कम होता है।",
                content: content,
                published: true
            }
        });
        console.log("Blog post created.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
