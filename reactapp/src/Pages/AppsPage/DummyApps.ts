import AppData from "./AppData";



const DUMMY_APPS: AppData[] = [];
for (let i=0; i< 10; i++){
    DUMMY_APPS.push(
        {
            id: i,
            creator: `John Smith #${i}`,
            description: `Cool Description #${i}`,
            img_url:"https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp",
            price: 10,
            name: `App #${i}`,
            publication_date: '1.5.2022',
            rating: 3,
            SHA: '256da46546fd',
            version: 1.0
        }
    )
}

export default DUMMY_APPS