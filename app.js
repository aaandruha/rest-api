const express = require("express");
const path = require("path");
const { v4 } = require("uuid");
const app = express();

let CONTACTS = [{ id: v4(), name: "Andrey", value: "+8776555", marked: false }];

app.use(express.json());

// GET
app.get("/api/contacts", (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS);
  }, 1000);
});

// POST
app.post("/api/contacts", (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
});

//DELETE
app.delete("/api/contacts/:contactId", (req, res) => {
  CONTACTS = CONTACTS.filter((c) => c.id !== req.params.contactId);
  res.status(200).json({ message: "Контакт был удален" });
});

//PUT
app.put("/api/contacts/:contactId", (req, res) => {
  console.log(req.body);
  const ind = CONTACTS.findIndex((c) => c.id === req.params.contactId);
  CONTACTS[ind] = req.body;
  res.json(CONTACTS[ind]);
});

app.use(express.static(path.resolve(__dirname, "client")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});
app.listen(3000, () => {
  console.log("Server started..");
});
