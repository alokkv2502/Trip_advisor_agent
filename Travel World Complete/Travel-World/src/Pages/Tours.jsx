import React from "react";
import CommonSection from "../Shared/CommonSection";
import "../styles/Tour.css";
import TourCard from "./../Shared/TourCard";
import SearchBar from "../Shared/SearchBar";
import Newsletter from "../Shared/Newsletter";
import { Container, Row, Col } from "reactstrap";

const Tours = () => {
  // Hardcoded tour data is now defined directly inside the component
  const toursData = [
    {
      _id: "delhi-1",
      title: "Explore Red Fort",
      city: "Delhi",
      photo: "https://media.istockphoto.com/id/501905872/photo/red-fort-delhi-india.jpg?s=612x612&w=0&k=20&c=TMHyWfCRBVIrDGOpmOWGJWKerZvu0tC1Z1-yYDe2QwM=",
      desc: "A historic fort complex built by Mughal emperor Shah Jahan, a UNESCO World Heritage Site.",
      price: 35,
      distance: 5,
      address: "Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi",
      maxGroupSize: 15,
      reviews: [{ username: "Anish Sharma", rating: 4.8, reviewText: "The history is so rich!", createdAt: new Date("2025-09-18T10:00:00Z") }],
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
      distance: 11,
      address: "Devi Singh Pura, Amer, Jaipur",
      maxGroupSize: 20,
      reviews: [{ username: "Priya Singh", rating: 4.6, reviewText: "Absolutely beautiful and grand.", createdAt: new Date("2025-09-17T11:00:00Z") }],
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
      distance: 0,
      address: "Dharmapuri, Forest Colony, Tajganj, Agra",
      maxGroupSize: 10,
      reviews: [{ username: "Rajesh Kumar", rating: 5.0, reviewText: "A breathtaking symbol of love.", createdAt: new Date("2025-09-16T12:00:00Z") }],
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
      distance: 2,
      address: "Tapovan, Rishikesh",
      maxGroupSize: 8,
      reviews: [{ username: "Sonia Verma", rating: 4.9, reviewText: "An unforgettable adventure!", createdAt: new Date("2025-09-15T13:00:00Z") }],
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
      distance: 1,
      address: "Apollo Bunder, Colaba, Mumbai",
      maxGroupSize: 25,
      reviews: [{ username: "Alok Gupta", rating: 4.7, reviewText: "A must-see landmark in Mumbai.", createdAt: new Date("2025-09-14T14:00:00Z") }],
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
      distance: 9,
      address: "Baga, Goa",
      maxGroupSize: 50,
      reviews: [{ username: "Deepa Nair", rating: 4.5, reviewText: "Perfect place to unwind.", createdAt: new Date("2025-09-13T15:00:00Z") }],
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
      distance: 1,
      address: "Sayyaji Rao Road, Agrahara, Chamrajpura, Mysuru",
      maxGroupSize: 12,
      reviews: [{ username: "Vikram Kumar", rating: 4.9, reviewText: "The palace is a true masterpiece.", createdAt: new Date("2025-09-12T16:00:00Z") }],
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
      distance: 0.5,
      address: "Fort Kochi Beach, Kochi",
      maxGroupSize: 10,
      reviews: [{ username: "Ayesha Khan", rating: 4.6, reviewText: "A very unique and scenic sight.", createdAt: new Date("2025-09-11T17:00:00Z") }],
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
      distance: 1,
      address: "Lake Pichola, Udaipur",
      maxGroupSize: 10,
      reviews: [{ username: "Sanjay Reddy", rating: 4.8, reviewText: "The sunset boat ride was magical.", createdAt: new Date("2025-09-10T18:00:00Z") }],
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
      distance: 2,
      address: "Ooty Railway Station, Ooty",
      maxGroupSize: 10,
      reviews: [{ username: "Kavita Rao", rating: 4.9, reviewText: "A fantastic and nostalgic train ride.", createdAt: new Date("2025-09-09T19:00:00Z") }],
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
      distance: 3,
      address: "Victoria Memorial Hall, 1, Queens Way, Kolkata",
      maxGroupSize: 20,
      reviews: [{ username: "Rahul Das", rating: 4.7, reviewText: "Majestic and historically significant.", createdAt: new Date("2025-09-08T20:00:00Z") }],
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
      distance: 0.2,
      address: "Darjeeling Railway Station, Darjeeling",
      maxGroupSize: 10,
      reviews: [{ username: "Manish Kumar", rating: 4.8, reviewText: "A charming journey through the hills.", createdAt: new Date("2025-09-07T21:00:00Z") }],
      avgRating: 4.8,
      featured: true,
    },
  ];

  return (
    <div>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {/* Display all hardcoded tours */}
            {Array.isArray(toursData) &&
              toursData.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Tours;