const Listing = require('../models/listing.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => { 
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

module.exports.renderNewForm =(req, res) => {
    res.render("listings/new.ejs");
  };

module.exports.showListing = async (req, res) => { 
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path: "reviews", // nested pop for r or a
      populate: {
        path: "author",
      },
    })
    .populate("owner");
    if (!listing) {
      throw new ExpressError("Listing you requested does not exist!", 404);
    }
    res.render("listings/show.ejs", { 
      listing,
      mapToken: process.env.MAP_TOKEN
     });
  };

module.exports.createListing =async (req, res) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  })
    .send();


  let url = req.file.path;
  let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // to add curr owner
    newListing.image = {url, filename};
    newListing.geometry = (response.body.features[0].geometry); // store location in db
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash('success', 'Successfully created a new listing!');
    res.redirect(`/listings`);
  };

module.exports.editListing = async (req, res) => { 
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError("Listing you requested does not exist!", 404);
    }
    res.render("listings/edit.ejs", { listing });
  };


  module.exports.updateListing = async (req, res) => { 
    let { id } = req.params;

    // First, find the listing and update its text/price/etc.
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // Check if the location text was changed. If so, geocode the new location.
    // This assumes the new location is in req.body.listing.location
    if (req.body.listing.location) {
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        }).send();
        
        // Update the listing's geometry with the new coordinates
        listing.geometry = response.body.features[0].geometry;
    }

    // Check if a new file was uploaded
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }
    
    // Save all changes (geometry and/or image)
    await listing.save();

    req.flash('success', 'Successfully updated the listing!');
    res.redirect(`/listings/${id}`);
};


module.exports.deleteListing = async (req, res) => { 
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the listing!');
    res.redirect('/listings');
  };