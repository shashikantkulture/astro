import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Clear existing services and categories
    await prisma.service.deleteMany({});
    await prisma.consultationCategory.deleteMany({});

    const category = await prisma.consultationCategory.create({
        data: {
            name: "Guidance Consultation Charges",
            description: "Apne jeevan ki disha samajhne aur sakaratmak nirnay lene ke liye margdarshan prapt karein.",
            order: 1
        }
    });

    const servicesData = [
        { title: "Vedic Jyotish Consultation", duration: "30–40 Min", price: "₹700", description: "Vedic astrology ke madhyam se apne grahon aur nakshatron ka vyapak vishleshan.", order: 1, popular: false },
        { title: "Numerology (Ank Jyotish)", duration: "20–25 Min", price: "₹500", description: "Aapke janm tithi aur naam ke aadhar par ank jyotish dwara margdarshan.", order: 2, popular: false },
        { title: "Tarot Reading", duration: "20 Min", price: "₹500", description: "Tarot cards ke madhyam se aapke vartamaan aur bhavishya ki urjaon ka aakalan.", order: 3, popular: false },
        { title: "Hand Reading", duration: "25 Min", price: "₹600", description: "Hast rekha vigyan dwara aapke vyaktitva aur sambhavnaon ki jankari.", order: 4, popular: false },
        { title: "Face Reading", duration: "25 Min", price: "₹600", description: "Chehre ki banao aur lakshanon ke aadhar par aantarik svabhav ka adhyayan.", order: 5, popular: false },
        { title: "Detailed Life Guidance (All Combined)", duration: "45–60 Min", price: "₹1,200", description: "Sabhi vidhaon ka upyog karke aapke jeevan ka sampurna aur samagra margdarshan.", popular: true, order: 6 },
    ];

    for (const s of servicesData) {
        await prisma.service.create({
            data: {
                ...s,
                categoryId: category.id
            }
        });
    }

    console.log("Services added successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
