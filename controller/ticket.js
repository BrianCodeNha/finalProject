import { Ticket } from "../model/Ticket.js";
import { frontEndURL } from "../shared/url.js";

export const createFakeTicket = (req, res, next) => {
  const chooseRandom = (items) =>
    items[Math.floor(Math.random() * items.length)];

  const userIdArray = [
    "629c776c105e641c517df434",
    "629c7774105e641c517df436",
    "629c7777105e641c517df438",
    "629c7778105e641c517df43a",
    "629c777a105e641c517df43c",
    "629c777c105e641c517df43e",
    "629c777e105e641c517df440",
    "629c777f105e641c517df442",
    "629c7781105e641c517df444",
    "629c7783105e641c517df446",
    "629c7785105e641c517df448",
    "629c7786105e641c517df44a",
    "629c7788105e641c517df44c",
    "629c7789105e641c517df44e",
    "629c7789105e641c517df44e",
    "629c778b105e641c517df450",
  ];

  try {
    const fakeNumber = Math.floor(Math.random() * 1000000);
    const testTicket = new Ticket({
      producer: "Cần Thơ",
      number: fakeNumber,
      date: "22/06/2021",
      userId: chooseRandom(userIdArray),
    });

    testTicket.save().then(() => {
      console.log(`fake ticket ${fakeNumber} created`);
      res.send(`fake ticket ${fakeNumber} created`);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTicket = (req, res) => {
  console.log(
    "🚀 ~ file: ticket.js ~ line 31 ~ getTicket ~ req",
    req.session.user
  );
  if (req.session.user.role === "admin") {
    console.log("admin ticket");
    try {
      Ticket.find().then((tickets) => {
        res.status(200).json(tickets);
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    console.log("user Ticket");
    try {
      Ticket.find({ userId: req.session.user._id }).then((tickets) => {
        console.log(
          "🚀 ~ file: ticket.js ~ line 45 ~ Ticket.find ~ tickets",
          tickets
        );
        res.status(200).json(tickets);
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};

export const addTicket = async (req, res) => {
  console.log("🚀 ~ file: ticket.js ~ line 42 ~ addTicket ~ req", req.body);
  try {
    console.log(
      "🚀 ~ file: ticket.js ~ line 46 ~ addTicket ~ (req.session.errors",
      req.session.errors
    );
    if (req.session.errors) {
      res.status(503).send(req.session.errors);
    } else {
      const newTicket = new Ticket(req.body);
      await newTicket.save();
      if (req.session.user.role === "admin") {
        Ticket.find().then((tickets) => {
          res.status(200).json(tickets);
        });
      } else {
        Ticket.find({ userId: req.session.user._id }).then((tickets) => {
          res.status(200).json(tickets);
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const editTicket = async (req, res) => {
  console.log("🚀 ~ file: ticket.js ~ line 42 ~ addTicket ~ req", req.body);
  try {
    const updatedTicket = req.body;
    const id = updatedTicket.id;
    await Ticket.findByIdAndUpdate(id, updatedTicket);
    if (req.session.user.role === "admin") {
      Ticket.find().then((tickets) => {
        res.status(200).json(tickets);
      });
    } else {
      Ticket.find({ userId: req.session.user._id }).then((tickets) => {
        res.status(200).json(tickets);
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteTicket = async (req, res) => {
  const id = req.params.id;
  console.log("🚀 ~ file: ticket.js ~ line 42 ~ deleteTicket ~ id", id);
  try {
    await Ticket.findByIdAndRemove(id);
    if (req.session.user.role === "admin") {
      Ticket.find().then((tickets) => {
        res.status(200).json(tickets);
      });
    } else {
      Ticket.find({ userId: req.session.user._id }).then((tickets) => {
        res.status(200).json(tickets);
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteManyTicket = async (req, res) => {
  const idList = req.body.idList;
  console.log(
    "🚀 ~ file: ticket.js ~ line 69 ~ deleteManyTicket ~ idList",
    idList
  );
  try {
    await Ticket.deleteMany({ _id: idList });
    if (req.session.user.role === "admin") {
      Ticket.find().then((tickets) => {
        res.status(200).json(tickets);
      });
    } else {
      Ticket.find({ userId: req.session.user._id }).then((tickets) => {
        res.status(200).json(tickets);
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
