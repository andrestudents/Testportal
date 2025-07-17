

export const generateMockData = () => {
    const titles = [
        "Kenali Tingkatan Influencers berdasarkan Jumlah Followers",
        "Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer Marketing yang Tepat",
        "Tips Memilih Influencer yang Tepat untuk Brand Anda",
        "Strategi Content Marketing di Era Digital",
        "Cara Mengukur ROI dari Influencer Marketing",
        "Panduan Lengkap Social Media Marketing untuk Pemula",
        "Tren Terbaru dalam Dunia Digital Marketing",
        "Mengoptimalkan Engagement Rate di Social Media"
    ];

    const data = [];
    for (let i = 1; i <= 100; i++) {
        data.push({
            id: i,
            title: titles[Math.floor(Math.random() * titles.length)],
            date: new Date(2022, 8, Math.floor(Math.random() * 30) + 1),
            image: `https://picsum.photos/300/200?random=${i}`,
            category: "Digital Marketing"
        });
    }
    return data;
};