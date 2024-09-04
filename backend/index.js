const express = require("express");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 3001;
const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url);
const Name = require("./models/name.model");
const Notification = require("./models/notification.model");
app.use(express.json());
app.use(cors());
const projectId = process.env.PROJECT_ID;
const secretId = process.env.SECRET_ID;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/name", (req, res) => {
  console.log("start");
  const { name, address } = req.body;
  const newName = new Name({
    name,
    address,
  });
  newName.save().then(() => {
    res.json({ message: "Name saved" });
  });
});
app.get("/name/:address", (req, res) => {
  const address = req.params.address; // Use req.params to get the address from the URL path
  console.log(address);
  // Find one name by address
  Name.findOne({ address: address })
    .then((name) => {
      if (name) {
        console.log(name);
        // If a name is found, send it as JSON
        res.json(name);
      } else {
        // If no name is found, send a 404 status with a message
        res.status(404).json({ message: "No name found for this address" });
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the query
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request" });
    });
});

app.post("/scheduleNotification", async (req, res) => {
  const { date, time, notificationPayload } = req.body;

  // Convert date from DD-MM-YY to YYYY-MM-DD
  const [day, month, year] = date.split("-");
  const formattedDate = `20${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
  const scheduledDate = new Date(`${formattedDate}T${time}:00`);

  if (isNaN(scheduledDate.getTime())) {
    return res.status(400).json({ error: "Invalid date or time format." });
  }

  // Schedule the job
  schedule.scheduleJob(scheduledDate, async () => {
    const result = await fetch(
      `https://notify.walletconnect.com/${projectId}/notify`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretId}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationPayload),
      }
    );
    const gmRes = await result.json();

    const newNotification = new Notification({
      date: scheduledDate,
      address: notificationPayload.accounts[0],
      message: notificationPayload.title || "Notification sent successfully",
    });
    newNotification.save();
  });
  res.json({ message: `Notification scheduled for ${scheduledDate}` });
});

app.delete("/notification", async (req, res) => {
  const { date, time, addressData } = req.body;
  const [day, month, year] = date.split("-");
  const formattedDate = `20${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
  const scheduledDate = new Date(`${formattedDate}T${time}:00`);
  console.log(req.body);
  try {
    const find = await Notification.findOne({
      date: new Date(scheduledDate),
      address: addressData,
    });
    console.log(find);
    const result = await Notification.deleteOne({
      date: new Date(scheduledDate),
      address: addressData,
    });
    console.log(result);
    if (result.deletedCount > 0) {
      res.json({ message: find.message });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting notification." });
  }
});

app.get("/token/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await fetch(
      `https://api.1inch.dev/token/v1.2/${id}/token-list`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer 3bcy8xNjv2yBqKqFl7JhTp3g0e588AIM",
        },
      }
    );

    const data = await response.json();
    res.json(data["tokens"]);
  } catch (error) {
    console.error("Error fetching chain data:", error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
