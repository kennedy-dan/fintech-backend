const axios = require("axios");
const Airtime = require("../model/airtimeTransaction");
const DataCats = require("../model/dataCats");
const CableCats = require('../model/cableCats')
const PowerCats = require('../model/powerCats')
const AirtimeCats = require('../model/airtimeCats')
const InternetCats = require('../model/internetCats')
// import Airtime from "../model/airtimeTransaction";

exports.createAirtime = async (req, res) => {
  var config = {
    method: "POST",
    url: `https://api.flutterwave.com/v3/bills`,
    headers: {
      Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      country: req.body.country,
      customer: req.body.customer,
      amount: req.body.amount,
      type: req.body.type,
      reference: Math.random() * 1000000000,
    },
    
  };
  console.log(req.user)

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      
      const airtimeData = {
        user: req.user._id,
        network: response.data.data.network,
        phone: response.data.data.phone_number,
        amount: response.data.data.amount,
        transactionId: response.data.data.flw_ref
      };
      const airtime = new Airtime(airtimeData);
      airtime.save((err, airtimesuccess) => {
        if (err) res.status(400).json({ err });
        if (airtimesuccess)
          res
            .status(200)
            .json({ message: "Address added successfully", airtimesuccess });
      });
    })

    .catch(function (error) {
      console.log(error);
    });
};

exports.getDataCats = async (req, res) => {
  var config = {
    method: "GET",
    url: `https://api.flutterwave.com/v3/bill-categories?data_bundle=1`,
    headers: {
      Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  axios(config).then(function (response) {
    // console.log(JSON.stringify(response.data));
    const dataName = response.data.data.map((data) => data.biller_name);
    console.log(dataName);
    const datatype = {
      type: response.data,
    };
    const data = new DataCats(datatype);
    data.save((err, getdataSuccess) => {
      if (err) res.status(400).json({ err });
      if (getdataSuccess)
        res
          .status(200)
          .json({ message: "Address added successfully", getdataSuccess });
    });
  });
};

exports.getAirtimeCats = async (req, res) => {
  var config = {
    method: "GET",
    url: `https://api.flutterwave.com/v3/bill-categories?airtime=1`,
    headers: {
      Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  axios(config).then(function (response) {
    // console.log(JSON.stringify(response.data));
    const dataName = response.data.data.map((data) => data.biller_name);
    console.log(dataName);
    const datatype = {
      type: response.data,
    };
    const data = new AirtimeCats(datatype);
    data.save((err, getdataSuccess) => {
      if (err) res.status(400).json({ err });
      if (getdataSuccess)
        res
          .status(200)
          .json({ message: "airtime successfully gotten", getdataSuccess });
    });
  });
};

exports.getCableCats = async (req, res) => {
  var config = {
    method: "GET",
    url: `https://api.flutterwave.com/v3/bill-categories?cable=1`,
    headers: {
      Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  axios(config).then(function (response) {
    // console.log(JSON.stringify(response.data));
    const dataName = response.data.data.map((data) => data.biller_name);
    console.log(dataName);
    const datatype = {
      type: response.data,
    };
    const data = new CableCats(datatype);
    data.save((err, getdataSuccess) => {
      if (err) res.status(400).json({ err });
      if (getdataSuccess)
        res
          .status(200)
          .json({ message: "cables successfully gotten", getdataSuccess });
    });
  });
};

exports.getPowerCats = async (req, res) => {
  var config = {
    method: "GET",
    url: `https://api.flutterwave.com/v3/bill-categories?power=1`,
    headers: {
      Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  axios(config).then(function (response) {
    // console.log(JSON.stringify(response.data));
    const dataName = response.data.data.map((data) => data.biller_name);
    console.log(dataName);
    const datatype = {
      type: response.data,
    };
    const data = new PowerCats(datatype);
    data.save((err, getdataSuccess) => {
      if (err) res.status(400).json({ err });
      if (getdataSuccess)
        res
          .status(200)
          .json({ message: "power successfully gotten", getdataSuccess });
    });
  });
};

exports.getInternetrCats = async (req, res) => {
  var config = {
    method: "GET",
    url: `https://api.flutterwave.com/v3/bill-categories?internet=1`,
    headers: {
      Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  axios(config).then(function (response) {
    // console.log(JSON.stringify(response.data));
    const dataName = response.data.data.map((data) => data.biller_name);
    console.log(dataName);
    const datatype = {
      type: response.data,
    };
    const data = new InternetCats(datatype);
    data.save((err, getdataSuccess) => {
      if (err) res.status(400).json({ err });
      if (getdataSuccess)
        res 
          .status(200)
          .json({ message: "internet successfully gotten", getdataSuccess });
    });
  });
};

exports.getDataCategories = (req, res) => {
   DataCats.find({}).exec((err, datacats) => {
    if (err) return res.status(400).json({ err });
    if (datacats) {
      res.status(200).json({ datacats });
    }
  });
};

exports.getAirtime = async (req,res) => {
  const bills = await Airtime.find({user:req.user._id});

  res.status(200).json({
    success: true,
    bills,
  });
}