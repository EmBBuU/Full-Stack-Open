const express = require("express");
const app = express();
const cors = require("cors");

const morgan = require("morgan");
morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Ananas",
    number: "1234",
  },
];

app.get("/api/persons", (request, response) => {
  console.log(persons);
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br /> ${new Date()}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send("Phone number not found.");
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing.",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number,
  };

  const personExists = persons.some((person) => person.name === body.name);

  if (personExists) {
    return response.status(400).json({
      error: "Name must be unique.",
    });
  }

  persons = persons.concat(person);
  response.json(person);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
