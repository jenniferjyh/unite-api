const express = require("express");
const cors = require("cors");
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

const db = {
  listings: [
    {
      id: 1,
      title: "East Facing Room in Tuscany Apartments",
      header: {
        image:
          "https://images1.apartments.com/i2/Ugp3y9YK4y4tJSiFCh2pIpWSgqY0YQEQRu7hDxxxX90/111/image.jpg",
        bed: 1,
        bath: 1,
        address: "3770 S Figueroa St, Los Angeles",
        price: 1200,
        startDate: "06/01/2020",
        endDate: "09/01/2020",
        likes: 120,
        host: "Jacob Moon"
      },
      deets: {
        description:
          "This is where I live for this whole year - the room is extremely spacious and all furniture is provided for you.",
        kitchen: "shared with 1 other",
        gym: "2nd floor in the building",
        washer: "in unit",
        dryer: "in unit",
        wifi: "Spectrum 5G",
        AC: "Central Control",
        parking: "valet available",
        map: "",
        rules: ""
      }
    },
    {
      id: 2,
      title: "West Facing Room in WREN Apartments",
      header: {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2j0EMz1W3zuO8T3sxxG_dScJ9q-MC_jQ1-PqoUT0FX-lMnhut&s",
        bed: 1,
        bath: 1,
        address: "1230 S Olive St, Los Angeles",
        price: 1100,
        startDate: "05/01/2020",
        endDate: "08/01/2020",
        likes: 80,
        host: "Joseph Park"
      },
      deets: {
        description:
          "Amazing apartment amenities in downtown, close to everything.",
        kitchen: "shared with 2 others",
        gym: "3rd floor in the building",
        washer: "in unit",
        dryer: "in unit",
        wifi: "Spectrum 5G",
        AC: "In Room",
        parking: "street parking",
        map: "",
        rules: ""
      }
    }
  ]
};
const err = {
  errors: {
    title: "title is required"
  }
};

app.get("/api/listings", (request, response) => {
  response.json(db.listings);
});

app.post("/api/listings", (request, response) => {
  const listing = {
    id: db.listings.length + 1,
    title: request.body.title,
    header: {
      image: request.body.header.image,
      bed: request.body.header.bed,
      bath: request.body.header.bath,
      address: request.body.header.address,
      price: request.body.header.price,
      startDate: request.body.header.startDate,
      endDate: request.body.header.endDate,
      likes: request.body.header.likes,
      host: request.body.header.host
    },
    deets: {
      description: request.body.deets.description,
      kitchen: request.body.deets.kitchen,
      gym: request.body.deets.gym,
      washer: request.body.deets.washer,
      dryer: request.body.deets.dryer,
      wifi: request.body.deets.wifi,
      AC: request.body.deets.AC,
      parking: request.body.deets.parking,
      map: request.body.deets.map,
      rules: request.body.deets.rules
    }
  };
  if (!listing.title) {
    return response.status(400).json(err.errors);
  }
  db.listings.push(listing);
  response.json(listing);
});

app.get("/api/listings/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.listings.find(post => {
    return post.id === id;
  });

  if (post) {
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.delete("/api/listings/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.listings.find(post => {
    return post.id === id;
  });

  if (post) {
    db.listings = db.listings.filter(post => {
      return post.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put("/api/listings/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.listings.find(post => {
    return post.id === id;
  });

  if (post) {
    Object.assign(post, request.body);
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.listen(process.env.PORT || 3000);
