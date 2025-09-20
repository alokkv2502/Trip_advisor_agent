  import React from 'react';
import TourCard from '../../Shared/TourCard';
import { Button, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const FeaturedToursList = () => {
  // Hardcoded tour data directly within the component
  const featuredToursData = [
    {
      _id: "delhi-1",
      title: "Explore Red Fort",
      city: "Delhi",
      photo: "https://media.istockphoto.com/id/501905872/photo/red-fort-delhi-india.jpg?s=612x612&w=0&k=20&c=TMHyWfCRBVIrDGOpmOWGJWKerZvu0tC1Z1-yYDe2QwM=",
      desc: "A historic fort complex built by Mughal emperor Shah Jahan, a UNESCO World Heritage Site.",
      price: 35,
      maxGroupSize: 15,
      reviews: [{ name: "Anish Sharma", rating: 4.8 }],
      avgRating: 4.8,
      featured: true,
    },
    {
      _id: "jaipur-1",
      title: "Visit Amer Fort",
      city: "Jaipur",
      photo: "https://media.istockphoto.com/id/1280487187/photo/ajmer-fort-government-museum-india.jpg?s=612x612&w=0&k=20&c=qGKPgEhwbS4inArfZ4mHqZmk8H71exqkz554oKgC7HM=",
      desc: "A magnificent fort located on a hill, famous for its artistic Hindu-style architecture.",
      price: 100,
      maxGroupSize: 20,
      reviews: [{ name: "Priya Singh", rating: 4.6 }],
      avgRating: 4.6,
      featured: true,
    },
    {
      _id: "agra-1",
      title: "See the Taj Mahal",
      city: "Agra",
      photo: "https://media.istockphoto.com/id/154894958/photo/amber-fort-jaipur-india.jpg?s=612x612&w=0&k=20&c=gCNirw30cmkl7clV30l8mcbmxOk-IAoT5ACxHRBQsdA=",
      desc: "An iconic ivory-white marble mausoleum, a symbol of eternal love.",
      price: 50,
      maxGroupSize: 10,
      reviews: [{ name: "Rajesh Kumar", rating: 5.0 }],
      avgRating: 5.0,
      featured: true,
    },
    {
      _id: "rishikesh-1",
      title: "Go River Rafting",
      city: "Rishikesh",
      photo: "https://media.istockphoto.com/id/1401891413/photo/friends-rafting-in-river.jpg?s=612x612&w=0&k=20&c=C8QvXHMORDl5ZCTRdq89fkorukq-TKowHHMjthY9qI8=",
      desc: "Adventure rafting in the strong currents of the Ganges River, a thrilling experience.",
      price: 1200,
      maxGroupSize: 8,
      reviews: [{ name: "Sonia Verma", rating: 4.9 }],
      avgRating: 4.9,
      featured: true,
    },
    {
      _id: "mumbai-1",
      title: "Visit Gateway of India",
      city: "Mumbai",
      photo: "https://media.istockphoto.com/id/683044646/photo/gateway-of-india.jpg?s=612x612&w=0&k=20&c=0CuIXh0jpk-qNnMu7mLEqwspQAoBraXk7n5fzvkl6NQ=",
      desc: "A grand arch monument built to commemorate the visit of King George V and Queen Mary.",
      price: 0,
      maxGroupSize: 25,
      reviews: [{ name: "Alok Gupta", rating: 4.7 }],
      avgRating: 4.7,
      featured: true,
    },
    {
      _id: "goa-1",
      title: "Relax on Baga Beach",
      city: "Goa",
      photo: "https://media.istockphoto.com/id/2191643781/photo/galgibaga-beach-aerial-panoramic-view-in-goa-india.jpg?s=612x612&w=0&k=20&c=0Se59yLifQNjGgH7jJxOXQEM_Aa4DMPwWPjF21DvXj4=",
      desc: "One of Goa's most famous beaches, offering water sports, shacks, and a lively nightlife.",
      price: 0,
      maxGroupSize: 50,
      reviews: [{ name: "Deepa Nair", rating: 4.5 }],
      avgRating: 4.5,
      featured: true,
    },
    {
      _id: "mysore-1",
      title: "Visit Mysore Palace",
      city: "Mysore",
      photo: "https://media.istockphoto.com/id/2161460684/video/bustling-indian-market-scene-with-fresh-fruit-stalls-and-diverse-shoppers.jpg?s=640x640&k=20&c=pxdrVqtqF2HhZb7kcOr25GVWy2w75Th2MifAH1HhBsc=",
      desc: "A historical palace and a royal residence, known for its intricate Indo-Saracenic architecture.",
      price: 70,
      maxGroupSize: 12,
      reviews: [{ name: "Vikram Kumar", rating: 4.9 }],
      avgRating: 4.9,
      featured: true,
    },
    {
      _id: "kochi-1",
      title: "See Chinese Fishing Nets",
      city: "Kochi",
      photo: "https://media.istockphoto.com/id/1313804643/photo/house-boat-sailing-in-the-allapuza-backwaters-kerala-known-as-gods-own-country-is-a-famous.jpg?s=612x612&w=0&k=20&c=z1eKSYTkzDe1-OJ6nXCCs8D-pxJZAvSmVbzHJpk-HaQ=",
      desc: "An iconic symbol of Kochi, these unique nets are a testament to the city's ancient trade links.",
      price: 0,
      maxGroupSize: 10,
      reviews: [{ name: "Ayesha Khan", rating: 4.6 }],
      avgRating: 4.6,
      featured: true,
    },
    {
      _id: "udaipur-1",
      title: "Boat Ride on Lake Pichola",
      city: "Udaipur",
      photo: "https://media.istockphoto.com/id/1244504409/photo/view-of-the-embankment-at-pichola-lake-in-udaipur.jpg?s=612x612&w=0&k=20&c=vOjCNYI09cZnTdlLu9i39kyxYNKnBEDDdbb-ky4KDx8=",
      desc: "A peaceful boat ride offering panoramic views of the city's palaces and ghats.",
      price: 400,
      maxGroupSize: 10,
      reviews: [{ name: "Sanjay Reddy", rating: 4.8 }],
      avgRating: 4.8,
      featured: true,
    },
    {
      _id: "ooty-1",
      title: "Ride the Nilgiri Mountain Railway",
      city: "Ooty",
      photo: "https://media.istockphoto.com/id/1812676528/photo/vintage-heritage-unesco-world-heritage-nilgiri-mountain-railway-mettopalaiym-to-ooty.jpg?s=612x612&w=0&k=20&c=DQb4Xx_xYUwvthLQDXsKhP88U-LysVMUWCtDwWgZF1A=",
      desc: "A UNESCO World Heritage Site, this steam-powered 'Toy Train' offers a scenic journey.",
      price: 205,
      maxGroupSize: 10,
      reviews: [{ name: "Kavita Rao", rating: 4.9 }],
      avgRating: 4.9,
      featured: true,
    },
    {
      _id: "kolkata-1",
      title: "Visit Victoria Memorial",
      city: "Kolkata",
      photo: "https://media.istockphoto.com/id/1311907512/photo/tourists-at-buckingham-palace.jpg?s=612x612&w=0&k=20&c=XQ4S9f0THzwF246UkQ1HfnyGXKKz595qxw546d88peE=",
      desc: "A grand marble building dedicated to Queen Victoria, surrounded by a beautiful garden.",
      price: 20,
      maxGroupSize: 20,
      reviews: [{ name: "Rahul Das", rating: 4.7 }],
      avgRating: 4.7,
      featured: true,
    },
    {
      _id: "darjeeling-1",
      title: "Ride the Darjeeling Toy Train",
      city: "Darjeeling",
      photo: "https://media.istockphoto.com/id/1478029265/photo/darjeeling-toy-train.jpg?s=612x612&w=0&k=20&c=K2gODKU2ubHDml3Gi-A1i9d3-TDlzEck5xhyA9Oc4m0=",
      desc: "A narrow-gauge steam railway, offering a scenic journey through the hills and tea plantations.",
      price: 1500,
      maxGroupSize: 10,
      reviews: [{ name: "Manish Kumar", rating: 4.8 }],
      avgRating: 4.8,
      featured: true,
    },
  ];

  return (
    <>
      {Array.isArray(featuredToursData) &&
        featuredToursData.map((tour) => (
          <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))}
      {/* <div className="viall__btn">
        <NavLink to={"/tours"}>
          <Button className='btn primary__btn'>View All Tours</Button>
        </NavLink>
      </div> */}
    </>
  );
};

export default FeaturedToursList;




